import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/services/ventas.service';
import { LoginService } from 'src/app/services/login.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.scss'],
})
export class AddClienteComponent implements OnInit {
  dataClient = {
    nombre_cte: "",
    direccion:"",
    comunidad:"",
    telefono:"",
    comentario:"",
    nombreUsuario: this.log.dataUser.usuario
  };
  constructor(
    public services: VentasService,
    public log: LoginService,
    public modalCtrl : ModalController
  ) { }

  ngOnInit() {}

  saveCliente(){
    this.services.addClient(this.dataClient).subscribe(resp=>{
      if(resp){
        alert("El cliente se agrego correctamente");
        this.modalCtrl.dismiss({
          'dismissed': true
        });
      }else{
        alert("Error al guardar");
      }
    });
  }

  dismissModal(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
