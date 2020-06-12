import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

/** Interfaces*/
import { Producto } from 'src/app/interfaces/login';

/** Components*/
import { VentasComponent } from '../ventas/ventas.component';
import { LoginService } from 'src/app/services/login.service';
import { VentasService } from 'src/app/services/ventas.service';

import { Storage } from '@ionic/storage';

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
    private storage: Storage
    ) {
      storage.get('Productos').then((val) => {
        this.items = val;
      })
   }

   doRefresh(event) {
    this.productos.getProductos();

    setTimeout(() => {
      this.items = this.productos.productos;

      event.target.complete();
    }, 2000);
  }

  /** itera los productos traídos del servidor */
  ngOnInit() {

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
    this.venta.addCarrito(producto);

    // let added = false;
    // for(let item of this.compra){
    //   if(item.id_inv === producto.id_inv){
    //     added = true;
    //     break;
    //   }
    // }

    // if(!added){
    //   this.compra.push(producto);
    //   this.venta.addCarrito(this.compra);
    this.ventas();

    // }
    //this.venta.addCarrito(this.compra);
  }
}
