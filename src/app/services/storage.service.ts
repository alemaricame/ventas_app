import { Injectable } from '@angular/core';

export interface login {
  idUser: number,
  usuario: string,
  password: string,
  tipo: string,
  nombreEmpleado: string
}

export interface productos {
  id_inv: number,
  idProducto: number,
  cantidad: number,
  descripcion: string,
  precio_venta_vendedor: number,
  idUser: number
}

export interface clientes{
  id_client: number,
  nombre_cte: string
}

export interface Ventas{
  idUser: any,
  fecha_add: string,
  id_client: string,
  total_pago: string,
  tipo_pago: string,
  monto_pagado: number,
  saldo: number,
  productos: any[],
}


const ITEMS_KEY = 'my-items';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage : Storage
  ) { }


  getLogin(item: login): Promise<any>{
    return this.storage.get(ITEMS_KEY).then((items: login[]) => {
      if(!items || items.length === 0){
        return null;
      }
      
      return this.storage.set(ITEMS_KEY, item)
    })
  }

  getProductos(item: productos){

  }

  addVenta(item: Ventas){
    console.log(item);
  }
}
