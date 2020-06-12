import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

/** Componentes */
import { LoginService } from 'src/app/services/login.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /** Opción de calendario e inventario */
  opt:string="";

  constructor(
    public menu: MenuController,
    private login: LoginService,
    public navCtrl: NavController,
    private storage: Storage
  ) {   
    storage.get('Data').then((val) => {
      console.log(val.idUser)
      if(val.idUser !== ""){
        this.login.getClientes();
        this.login.getProductos();
        this.login.getVentasHistory();
      }else{
        this.navCtrl.navigateRoot('/login');

      }
    });
  }

  /**
   * inicia la vista en el calendario
   */
  ngOnInit(){
    //this.opt="calendario";

    
  }


  /**
   * 
   * @param ev => selecciona el evento para el cambio en la vista calentario/inventario
   */
  opciones(ev:any){
    this.opt = ev.detail.value;
  }
}
