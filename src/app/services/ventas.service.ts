import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ToastController, ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable, empty, EMPTY } from 'rxjs';

/** Componentes */
import { environment } from 'src/environments/environment';
import { DatosVenta, RespVenta } from '../interfaces/ventas';
import { Producto } from '../interfaces/login';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Injectable({
  providedIn: 'root'
})
export class VentasService {
  /** Ventas del tipo de la interfaz ventas => DatosVenta */
  ventas:DatosVenta[];
  public insertVentaData: boolean = false;
  /** Generar ventas */
  private subject: BehaviorSubject<Producto[]> = new BehaviorSubject([]);
  /** Almacena los items del carrito del componente de productos para visualizarlo en el componente de Ventas */
  public itemsCarrito = [];
  public sucess : boolean = false;
  /**
   * 
   * @param http => plugin de peticiones
   */
  constructor(
    private http: HttpClient,
    public toastCtrl: ToastController,
    public iab : InAppBrowser,
    public modalCtrl: ModalController
  ) { }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Envíado al carrito.',
      duration: 2000
    });
    toast.present();
  }
    /**
     * 
     * @param data 
     * Envía los id de venta para buscarlos en la colección de venta
     */
  getVentas(data:string[]){
      return this.http.post<RespVenta>(environment.apiURL+'/ventas/getVenta',{ventas:data})
              .subscribe(resp=>{
                  this.ventas=resp.data.content.datosVentas;
      });
  }

  /**
   * 
   * @param producto 
   * Guarda los items del carrito en los productos
   */
  addCarrito(producto){
    console.log(producto);
    //this.itemsCarrito.push(producto);
     let added = false;
    for(let item of this.itemsCarrito){
      if(item.id_inv === producto.id_inv){
        added = true;
        break;
      }
    }

    if(!added){
      this.itemsCarrito.push(producto);
    }

    // let added = false;
    // let items = this.itemsCarrito[0];
    // for(let item of items){
    //   if(item.id_inv === producto.id_inv){
    //     added = true;
    //     break;
    //   }
    // }

    // if(!added){
    //   this.itemsCarrito.push(producto);
    //   this.presentToast();

    // }
  }

  removeCarrito(producto){
    //let items = this.itemsCarrito[0];
    for(let [index, p] of this.itemsCarrito.entries()){
      if(p.id_inv === producto.id_inv){
        this.itemsCarrito.splice(index, 1);
      }
    }

  //   console.log(this.itemsCarrito);
  //   //this.itemsCarrito = items;
  //   //this.subject.next(this.itemsCarrito); 

   }
  
  /**
   * Almacena los items del carrito para su uso
   */
  getCarrito(){
    return this.itemsCarrito;
  }

  /**
   * 
   * @param id => id del usuario al que se le almacenará el id de la venta
   * @param data => Todos los datos de la venta que conforman el ticket
   */
  insertVenta(data){
    //http://localhost/medicel/medicel_repo/php_action/createVentaRepartidor.php
    //let url = `login.php?usuario=${data['usuarioRepartidor']}&password=${data['passRepartidor']}`;
    this.itemsCarrito = [];
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    return this.http.post(environment.apiURL+'/consultas/agregarventa',data)
    .subscribe(resp=>{
      if(resp){
        alert("Venta generada")
        //let url = `http://34.217.42.49/medicel/medicel_prod/pdf/printOrderVtaVendedor.php?id=${resp}`;
        //window.location.reload();
        this.itemsCarrito = [];
        //this.iab.create(url,'_system');
        this.modalCtrl.dismiss({
          'dismissed': true
        });
      }else{
        alert("Error al agregar");
      }
    });
  }
  

  editClient(data){
    return this.http.post(environment.apiURL+'/consultas/editClient',data)
    .subscribe(resp=>{
      if(resp){
        alert("Se edito correctamente");
        this.modalCtrl.dismiss({
          'dismissed': true
        });
      }else{
        alert("Error al editar");
      }
    });
  }

  addClient(data){
    return this.http.post(environment.apiURL+'consultas/addCliente',data);
  }

  deleteClient(data){
    return this.http.post(environment.apiURL+'consultas/deleteCliente',data);
  }
}

