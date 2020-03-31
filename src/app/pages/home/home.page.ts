import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

/** Componentes */
import { LoginService } from 'src/app/services/login.service';

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
    public navCtrl: NavController
  ) {
  }

  /**
   * inicia la vista en el calendario
   */
  ngOnInit(){
    //this.opt="calendario";

    if(this.login.loguear === false){
      this.navCtrl.navigateRoot('/login');
    }else{
      this.login.getClientes();
      this.login.getProductos();
      this.login.getVentasHistory();
    }
  }


  /**
   * 
   * @param ev => selecciona el evento para el cambio en la vista calentario/inventario
   */
  opciones(ev:any){
    this.opt = ev.detail.value;
  }
}
