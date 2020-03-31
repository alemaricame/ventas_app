import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';

/** Interfaces */
import { Cliente } from 'src/app/interfaces/login';

/** Componente */
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  /**
   * item que define que el cliente es del tipo de la interfaz Cliente
   */
  items:Cliente[]=[];

  /**
   * Latitud y longitud para obtener la ubicación actual del dispositivo, así tenga el valor
   * en el navegador de googlemaps o el que sea seleccionado en el dispositivo
   */
  latitude:any;
  longitude:any;

  /**
   * 
   * @param perfil => Obtiene los datos del perfil de la colección del servicio
   * @param modalCtrl => plugin de modal
   * @param geolocation => plugin para la geolocalización
   * @param launchNavigator => lanza la aplicación donde se abrirá el despligue de la dirección del cliente
   */
  constructor(
    private perfil : LoginService,
    public modalCtrl : ModalController,
    private geolocation: Geolocation,
    private launchNavigator: LaunchNavigator
  ) { 
  }

  /**
   * Inicializa e iguala los valores del servicio del items de la infor de cliente con el del servicio para iterar
   * en el html
   */
  ngOnInit() {
    console.log(this.perfil.clientes);
    this.items = this.perfil.clientes;
  }

  /** Cierra el modal */
  dismissModal(){
      this.modalCtrl.dismiss({
        'dismissed': true
      });
  }

  /**
   * 
   * @param param => Obtiene el parametro de la dirección de cliente obtenida de los items mostrados en el html
   * Abré la ubicación actual y a la que se quiere llegar (clienteDirección) en la aplicación seleccionada por
   * el usuario en su dispositivo
   * 
   */
  direccion(param){
    console.log(param);
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude=resp.coords.latitude;
      this.longitude=resp.coords.longitude;
      this.launchNavigator.APP;
      this.launchNavigator.navigate(param.record.direccionCliente, { start: [this.latitude ,this.longitude]})
     .then(
       success => console.log('Launched navigator'),
       error => console.log('Error launching navigator', error)
     );
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }



}
