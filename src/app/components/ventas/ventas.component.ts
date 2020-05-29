import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FormBuilder, FormGroup} from '@angular/forms';

/** Interfaces */
import { Producto, Cliente } from 'src/app/interfaces/login';

/** Componentes */
import { LoginService } from 'src/app/services/login.service';
import { VentasService } from 'src/app/services/ventas.service';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {

  /** Grupo para la selección del cliente */
  public ticket: FormGroup;

  /** Identifica que los clientes son tipo de la interfaz login => Cliente  */
  clientes:[]=[];
  cliente = "";
  pago="";
  montoPagado=0;
  /** Productos de carrito*/
  private carrito: any = [];
  private totalVenta = 0;

  /**
   * 
   * @param modalCtrl => plugin del modal
   * @param data => Obtiene los datos del servicio del login
   * @param carritoService => Envía los datos hacía el servicio que inserta la venta
   * @param fb => plugin para el form group
   * 
   */
  constructor(
    public modalCtrl : ModalController,
    private data : LoginService,
    private carritoService: VentasService,
    public fb: FormBuilder
  ) {
    /** Form para obtener el cliente */
    this.clientes = this.data.clientes;
    this.carritoService.getCarrito().subscribe(data=>{
      this.carrito = data[0];
    })
    
  }

  /** Obtiene el producto que se selecciono para estar en el carrito y generar su venta */
  ngOnInit() {

  }

  onChangeTime(item){
    let totalp = 0;
    item.total = 0;
    totalp = Number(item.cantV)*item.precio_venta_vendedor;
    item.total = totalp;

    this.totalVentas();
  }

  totalVentas(){
    var totalVenta = 0;
    for (let val of this.carrito) {
      totalVenta = Number(totalVenta + val.total);
    }
    this.totalVenta = totalVenta;
  }
  /** Oculta el modal */
  dismissModal(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  /**
   * Prepara los datos para enviarlos a su registro de venta
   */
  generarVenta(){
    const date = new Date()
    const formatedDate = date.toISOString().substring(0, 10);

    if(this.cliente !== ""){
      for (let client of this.data.clientes) {
        if(client.id_client === this.cliente){
          //if(this.pago == "Efectivo"){
            let datosVenta={
              idUser: this.data.dataUser.idUser,
              fecha_add: formatedDate,
              id_client:this.cliente,
              total_pago:this.totalVenta.toString(),
              tipo_pago: this.pago,
              monto_pagado: this.montoPagado,
              saldo: Number(this.totalVenta - this.montoPagado),
              productos: this.carrito
            }
        
            this.carritoService.insertVenta(datosVenta);
          // }else{
          //   if(client.telefono !== "-" ){
          //     let datosVenta={
          //       idUser: this.data.dataUser.idUser,
          //       fecha_add: formatedDate,
          //       id_client:this.cliente,
          //       total_pago:this.totalVenta.toString(),
          //       tipo_pago: this.pago,
          //       monto_pagado: this.montoPagado,
          //       saldo: Number(this.totalVenta - this.montoPagado),
          //       productos: this.carrito
          //     }
          
          //     this.carritoService.insertVenta(datosVenta);
          //    }else{
          //     alert("Tu venta no puede ser generada si el cliente no tiene sus datos completos");
          //  }
          // }
          
        }
      }
    }else{
      alert("Selecciona un cliente")
    }
    
  }

}
