
export interface RespUsuario {
  status: number;
  securityContext: SecurityContext;
  data: DatosUsuario;
}

export interface Data {
  clave: string;
  message: string;
  content: Content;
}

export interface Content {
  logged: boolean;
  datosUsuario: DatosUsuario;
}

export interface DatosUsuario {
  usuarioRepartidor: string;
  idRepartidor:string;
  nombreRepartidor: string;
  numTelRepartidor: number;
}

export interface Producto {
  nombreProducto: string;
  cantProducto: string;
  precioProducto: number;
}

export interface Cita {
  fechaCita: string;
  descCita: string;
  nombreCliente: string;
}

export interface Cliente {
  nombreCliente: string;
  direccionCliente: string;
  numTelCliente: string;
}

export interface SecurityContext {
  token: string;
}