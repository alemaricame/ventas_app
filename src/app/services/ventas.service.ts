import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

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

  /** Generar ventas */
  private subject: BehaviorSubject<Producto[]> = new BehaviorSubject([]);
  /** Almacena los items del carrito del componente de productos para visualizarlo en el componente de Ventas */
  private itemsCarrito: [] = [];

  /**
   * 
   * @param http => plugin de peticiones
   */
  constructor(
    private http: HttpClient,
    public toastCtrl: ToastController,
    public iab : InAppBrowser
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
  addCarrito(producto:Producto){
    this.subject.next([...this.itemsCarrito, producto]); 
    this.presentToast();
  }
  
  /**
   * Almacena los items del carrito para su uso
   */
  getCarrito(): Observable<Producto[]> {
    return this.subject;
  }

  /**
   * 
   * @param id => id del usuario al que se le almacenará el id de la venta
   * @param data => Todos los datos de la venta que conforman el ticket
   */
  insertVenta(data){
    //http://localhost/medicel/medicel_repo/php_action/createVentaRepartidor.php
    //let url = `login.php?usuario=${data['usuarioRepartidor']}&password=${data['passRepartidor']}`;
    return this.http.post(environment.apiURL+'/consultas/agregarventa',data)
    .subscribe(resp=>{
      if(resp){
        alert("Venta generada")
        let url = `https://medicel.000webhostapp.com/medicel_repo/pdf/printOrderVta.php?id/${resp}`;
        this.iab.create(url);
      }else{
        alert("Error al agregar");
      }
    });
  }

  editClient(data){
    return this.http.post(environment.apiURL+'/consultas/editClient',data)
    .subscribe(resp=>{
      if(resp){
        alert("Se edito correctamente")
      }else{
        alert("Error al editar");
      }
    });

  }
}

