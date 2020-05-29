import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

/** Interfaces */
import { DatosVenta, Producto } from 'src/app/interfaces/ventas';

/** Componentes */
import { VentasService } from 'src/app/services/ventas.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-detalleventas',
  templateUrl: './detalleventas.component.html',
  styleUrls: ['./detalleventas.component.scss'],
})
export class DetalleventasComponent implements OnInit {
  
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

    //this.venta.getVentasHistory();
    this.venta.getVentasProducts().add(()=>{
      this.prueba();
    });
  }

  prueba(){
    console.log("prueba");
    this.ventasDetalle = this.venta.ventasProductos;
  }

  /** Iguala las ventas a las ventas obtenidas del servicio */
   ngOnInit() {
   }

  /** Cierra el modal */
  dismissModal(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

}
