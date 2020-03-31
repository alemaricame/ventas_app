import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

/** Componentes */
import { ClientesComponent } from '../clientes/clientes.component';
import { HistorialventasComponent } from '../historialventas/historialventas.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu-perfil',
  templateUrl: './menu-perfil.component.html',
  styleUrls: ['./menu-perfil.component.scss'],
})
export class MenuPerfilComponent implements OnInit {

  /**
   * 
   * @param modalCtrl => plugin del modal
   * @param exit => Salir de la aplicación
   * @param navCtrl => plugin para lanzar el login
   */
  constructor(
    public modalCtrl : ModalController,
    private exit: LoginService,
    public navCtrl: NavController
  ) { }

  ngOnInit() {}


  /**
   * Abre el modal para visualizar los clientes que tiene el repartidor
   */
  async clientesModal(){
    const modal = await this.modalCtrl.create({
      component : ClientesComponent
    });
    return await modal.present();
  }

  /**
   * Abre el modal para visualizar las ventas que tiene el repartidor
   */
  async ventasModal(){
    const modal = await this.modalCtrl.create({
      component : HistorialventasComponent
    });
    return await modal.present();
  }


  /**
   * Cierra la sesión, reseteando los datos almacenados en el login y regresando a la página de login
   */
  cerrarSesion() {
    this.exit.loguear=null;
    this.navCtrl.navigateRoot("/login");
  }

}
