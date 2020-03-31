import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

/** Interfaces*/
import { Producto } from 'src/app/interfaces/login';

/** Components*/
import { VentasComponent } from '../ventas/ventas.component';
import { LoginService } from 'src/app/services/login.service';
import { VentasService } from 'src/app/services/ventas.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {

  /** Identifica que las items son tipo de la interfaz ventas => Producto  */
  items: Producto [] = [];
  compra:any = [];
  /**
   * 
   * @param modalCtrl => plugin del modal
   * @param productos => Servicio de login
   * @param venta => servicio de ventas
   */
  constructor ( 
    public modalCtrl: ModalController,
    private productos: LoginService,
    private venta: VentasService,
    ) {

   }

  /** itera los productos traídos del servidor */
  ngOnInit() {

    this.items = this.productos.productos;
    console.log(this.items);
  }

  /** Abre el modal del carrito */
  async ventas(){
    const modal = await this.modalCtrl.create( {
      component: VentasComponent,
      componentProps: this.items });

    return await modal.present();
  }
  
  /**
   * 
   * @param producto => envíado hacía el carrito
   * Envía el parámetro al modal del carrito
   */
  agregarProducto(producto){
    this.compra.push(producto);
    console.log("compra",this.compra);
    this.venta.addCarrito(this.compra);
  }
}
