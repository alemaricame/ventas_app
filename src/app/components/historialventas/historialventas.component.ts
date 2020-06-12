import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

/** Interfaces */
import { DatosVenta, Producto } from 'src/app/interfaces/ventas';

/** Componentes */
import { VentasService } from 'src/app/services/ventas.service';
import { LoginService } from 'src/app/services/login.service';
import { DetalleventasComponent } from '../detalleventa/detalleventas.component';
import { AbonosComponent } from '../abonos/abonos.component';

@Component({
  selector: 'app-historialventas',
  templateUrl: './historialventas.component.html',
  styleUrls: ['./historialventas.component.scss'],
})
export class HistorialventasComponent implements OnInit {
  
  /** Identifica que las ventas son tipo de la interfaz ventas => DatosVenta  */
  ventas: any = [];
  clientes;
  ventasDetalle;
  listProductos;
  /** Identifica que los productos son del tipo de la interfaz de ventas => Producto */
  productos: Producto[]=[];
  
  /**
   * 
   * @param modalCtrl => plugin del modal
   * @param getventas => Servicio que obtiene las ventas
   */
  constructor(
    public modalCtrl: ModalController,
    private getventas: VentasService,
    private venta: LoginService
  ) { 

    this.venta.getVentasHistory();
    this.clientes = this.venta.clientes;
    console.log(this.venta.clientes)
    //console.log(this.ventas);
  }

  /** Iguala las ventas a las ventas obtenidas del servicio */
  ngOnInit() {
  
    this.ventasDetalle = this.venta.ventas;
    console.log("ventasDetalle",this.ventasDetalle);
    // this.listProductos = this.ventas.datos;
    // console.log(this.listProductos);
  }

  /** Cierra el modal */
  dismissModal(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  // getId(e){
  //   console.log("id",e.idVentaRepartidor);
  // }

  async getId(e){
    this.venta.idVentaRepartidor = e.idVentaRepartidor;
    const modal = await this.modalCtrl.create({
      component : DetalleventasComponent
    });
    return await modal.present();
  }


  async abonar(item){
    this.venta.abonod = item;
    const modal = await this.modalCtrl.create({
      component : AbonosComponent
    });
    return await modal.present();
  }
}
