export interface RespVenta {
  status: number;
  data: Data;
}

export interface Data {
  clave: string;
  message: string;
  content: Content;
}

export interface Content {
  datosVentas: DatosVenta[];
}

export interface DatosVenta {
  _id: string;
  nombreCliente: string;
  totalVenta: string;
  productos: Producto[];
}

export interface Producto {
  nombreProducto: string;
  cantProducto: string;
  precioUProducto: string;
  precioTProducto?: number;
  precioTproducto?: number;
}