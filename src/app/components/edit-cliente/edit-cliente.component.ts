import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss'],
})
export class EditClienteComponent implements OnInit {
  dataClient;
  clientes=[];

  constructor(
    public navParams: NavParams,
    public modalCtrl : ModalController,
    public edit : VentasService 
  ) {
    this.clientes.push(navParams);
    this.dataClient = navParams;
    console.log(this.dataClient);
  }

  ngOnInit() {}

  dismissModal(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  editCliente(){
    this.edit.editClient(this.dataClient.data);
  }

}
