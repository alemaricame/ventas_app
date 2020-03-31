import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

/** Interfaces */
import { DatosVenta, Producto } from 'src/app/interfaces/ventas';

/** Componentes */
import { VentasService } from 'src/app/services/ventas.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-historialventas',
  templateUrl: './historialventas.component.html',
  styleUrls: ['./historialventas.component.scss'],
})
export class HistorialventasComponent implements OnInit {
  
  /** Identifica que las ventas son tipo de la interfaz ventas => DatosVenta  */
  ventas: any = [];

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

    //console.log(this.ventas);
  }

  /** Iguala las ventas a las ventas obtenidas del servicio */
  ngOnInit() {
    this.ventas = this.venta.ventas;

    this.ventasDetalle = this.ventas.detalle;
    console.log(this.ventasDetalle);
    this.listProductos = this.ventas.datos;
    console.log(this.listProductos);
  }

  /** Cierra el modal */
  dismissModal(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
