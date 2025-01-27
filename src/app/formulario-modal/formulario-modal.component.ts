import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalController, IonicModule } from '@ionic/angular';
import { ITarea , EstadoTarea} from '../interfaces/tarea';
import { TareaStore } from '../services/tareas-store.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-formulario-modal',
  templateUrl: './formulario-modal.component.html',
  styleUrls: ['./formulario-modal.component.scss'],
  providers: [TareaStore],
  imports: [IonicModule, ReactiveFormsModule],
})
export class FormularioModalComponent  implements OnInit {
  public registerForm: FormGroup;
  public fechaMinima: string;
  @Input() tarea: ITarea | null = null;

  constructor(private modalCtrl: ModalController, private formBuilder: FormBuilder,  private tareaStore: TareaStore) {
    this.fechaMinima = this.getFecha();
    this.registerForm = this.formBuilder.group({
      titulo: [ '' , Validators.required],
      descripcion: ['' , [Validators.required]],
      fechaVencimiento: ['' , Validators.required],
      estado: ['', Validators.required],
    });
  }

  ngOnInit() {
    console.log(this.tarea);
    if (this.tarea) { 
      this.registerForm.setValue({
        ...this.tarea,
        estado: "pendiente"
      })
    }

  }

  getFecha() { 
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${año}-${mes}-${dia}`;
  }

  onSubmit() { 
    if (this.registerForm.valid) {
      const newTarea: ITarea = {
        ...this.registerForm.value,
      }
      if (this.tarea) this.editar(newTarea, this.tarea.uid);
      else this.tareaStore.create(newTarea)
      this.close('confirm');
    }
  }
  editar(newTarea: ITarea, uid: string ) {
    newTarea.uid = uid;
    this.tareaStore.update(newTarea);
  }

  close(msg = '') { 
    return this.modalCtrl.dismiss(null, msg);
  }
} 
