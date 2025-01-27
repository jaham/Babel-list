import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { TareaStore } from '../services/tareas-store.service';
import { ITarea } from '../interfaces/tarea';
import { NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';



@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  providers: [TareaStore],
  imports: [ NgFor, IonicModule ]
})
export class ListaComponent implements OnInit {
  @Input() actualizar: number = 0;
  @Output() editar = new EventEmitter<ITarea>();
  public tareas: ITarea[] = [];

  constructor(private tareaStore: TareaStore) { }

  ngOnInit() {
    this.getTareas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getTareas();
    
  }

  borrar(uid: string) { 
    this.tareaStore.delete(uid);
    this.getTareas();
  }

  emitirEditar(tarea: ITarea) {
    this.editar.emit(tarea);
  }

  private getTareas() { 
    this.tareas = this.tareaStore.getTareas();
  }

}
