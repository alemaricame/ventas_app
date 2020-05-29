import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
/** Componentes */
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-abonos',
  templateUrl: './abonos.component.html',
  styleUrls: ['./abonos.component.scss'],
})
export class AbonosComponent implements OnInit {
  /**
   * 
   * @param citasService => Obtiene las citas de la colección del servicio
   * @param alertCtrl => Plugin para alertas
   */
  constructor(
    private citasService: LoginService,
    public modalCtrl: ModalController,

  ) { }

  /** Inicializa el calendario dependiendo si trae o no eventos/citas */
  ngOnInit(){
  }

  dismissModal(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


}
