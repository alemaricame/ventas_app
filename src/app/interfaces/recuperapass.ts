export interface RespPass {
  status: number;
  data: Data;
}

export interface Data {
  clave: string;
  message: string;
  content: Content;
}

export interface Content {
  logged: boolean;
  user: number;
}