import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { ListaComponent } from '../lista/lista.component';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormularioModalComponent } from '../formulario-modal/formulario-modal.component';
import { ITarea } from '../interfaces/tarea';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ListaComponent, IonicModule],
})
export class HomePage {
  public actualizar = 0;

  constructor(private modalCtrl: ModalController) { }
  
  async openModal(tarea: ITarea | null = null) {
    console.log(tarea);
    const modal = await this.modalCtrl.create({
      component: FormularioModalComponent,
      componentProps: {
        tarea
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.actualizar++;
    }
  }
}
