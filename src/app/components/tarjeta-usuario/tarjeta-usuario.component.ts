import { Component, OnInit } from '@angular/core';

/** Interfaces */
import { LoginService } from 'src/app/services/login.service';
import { DatosUsuario } from 'src/app/interfaces/login';

@Component({
  selector: 'app-tarjeta-usuario',
  templateUrl: './tarjeta-usuario.component.html',
  styleUrls: ['./tarjeta-usuario.component.scss'],
})
export class TarjetaUsuarioComponent implements OnInit {

  /** Identifica que los items son tipo de la interfaz login => DatosUsuario  */
  items:DatosUsuario[]=[];

  /**
   * 
   * @param login 
   * Servicio de login para obtener los datos del usuario
   */
  constructor(
    private login: LoginService
  ) {}

   /** Push para iterar los datos de usuario en el HTML */
   ngOnInit() {
    this.items = this.login.dataUser;
    console.log(this.items);
  }
}
