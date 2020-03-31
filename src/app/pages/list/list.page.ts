import { Component, OnInit } from '@angular/core';

/** Componentes */
import { VentasService } from 'src/app/services/ventas.service';
import { LoginService } from 'src/app/services/login.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements OnInit {
  public opciones = [
    {
      title: 'Ventas',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Perfil',
      url: '/list',
      icon: 'person'
    }
  ];

  /**
   * 
   * @param idsventas => Obtiene los id de ventas del servicio de ventas
   * @param ventas => Busca los registros de la venta por cada id registrado
   */
  constructor(
    private idsventas: LoginService,
    private ventas: VentasService,
    public navCtrl: NavController
  ) {

  }

  /**
   * Ejecuta el buscador de las ventas
   */
  ngOnInit() {
   /* if(this.idsventas.loguear){
      this.ventas.getVentas(this.idsventas.idventas);
    }else{
      this.navCtrl.navigateRoot('/login');
    }*/
  }
  
}
