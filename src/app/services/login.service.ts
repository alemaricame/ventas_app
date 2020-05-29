import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

/** Interfaces */
import { RespUsuario, DatosUsuario,Cliente, Producto } from '../interfaces/login';
import { RespPass } from '../interfaces/recuperapass';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  /** Variable de inicio de sesión */
//  loguear:DatosUsuario;
  /** Variables de clientes */
  //cliente:Cliente;
  
  /** Variable de productos */
  //productos:Producto[]=[];

  /** Array de ids de venta */
  //idventas:string[]=[];

  idRepartidorG: string = "";
  loguear;
  productos;
  dataUser;
  clientes;
  ventas;
  idVentaRepartidor;
  ventasProductos;
  abonod;
  /**
   * 
   * @param http => plugin de peticiones
   * @param alertCtrl => plugin de alerts
   * @param navCtrl => plugin para abrir la página en donde 
   * @param storage => plugin para guardar los datos en local
   */
  constructor(
    private http: HttpClient,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    private storage: Storage,
  ) { }

  /**
   * 
   * @param data 
   * Login de usuarios
   */
  login(data:string){
    //usuario=Rosendo&password=Rosendo123
    let url=environment.apiURL+'login/login';
    //return this.http.post(url,data)
    //let url = environment.apiURL+`login.php?usuario=${data['usuarioRepartidor']}&password=${data['passRepartidor']}`;
    return this.http.post(url,data)
      .subscribe( resp =>{
        console.log(resp);
        
          if(resp=="error"){
            this.loguear==false;
            alert("Error");
            this.navCtrl.navigateRoot('/login');

          }else{

             /** Almacena la respuesta en el storage */
             this.storage.set('Data',resp);
             this.dataUser = resp;
             /** Determina el tipo de dato al que pertenece cada elemento de la colección */
               this.loguear==true;
               /** Si el inicio de sesión es correcto, abre la pantalla de home */
            this.navCtrl.navigateRoot('/home');
          }
   });   
  }

  getProductos() {
    //return this.http.post<RespVenta>(environment.apiURL+'/ventas/insertVenta',{id:id,venta:data})
    let url=  environment.apiURL+'consultas/productos';
    return this.http.post(url,{idUser:this.dataUser.idUser})
        .subscribe( resp =>{
          this.productos = resp;

    });  
  }

  getClientes() {
    //return this.http.post<RespVenta>(environment.apiURL+'/ventas/insertVenta',{id:id,venta:data})
    let url= environment.apiURL+'consultas/clientes';
    return this.http.post(url,{usuario:this.dataUser.usuario})
        .subscribe( resp =>{
          console.log("clientes",resp);
          this.clientes = resp;

    });  
  }

  getVentasHistory(){
    //localhost/rutas/index.php/consultas/verventas
    let url= environment.apiURL+'consultas/verventas';
    return this.http.post(url,{idUser:this.dataUser.idUser})
        .subscribe( resp =>{
          console.log("ventas",resp);
          this.ventas = resp;

    }); 
  }

  getVentasProducts(){
    console.log("service")
    //localhost/rutas/index.php/consultas/verventas
    let url= environment.apiURL+'consultas/productosventas';
    return this.http.post(url,{idVentaRepartidor:this.idVentaRepartidor})
        .subscribe( resp =>{
          console.log("productos venta",resp);
          this.ventasProductos = resp;
    }); 
  }
  /* USUARIO ACTIVO */
  /**
   * 
   * @param usuarioRepartidor 
   */
  recuperapass(usuarioRepartidor){

    return this.http.post<RespPass>(environment.apiURL+'/recuperaPass',{usuarioRepartidor:usuarioRepartidor});
  }
}

