import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CalendarioComponent } from './calendario/calendario.component';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import {NgCalendarModule} from 'ionic2-calendar';
import { HeaderComponent } from './header/header.component';
import { TarjetaUsuarioComponent } from './tarjeta-usuario/tarjeta-usuario.component';
import { MenuPerfilComponent } from './menu-perfil/menu-perfil.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HistorialventasComponent } from './historialventas/historialventas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CalendarioComponent,
    ProductosComponent,
    VentasComponent,
    HeaderComponent,
    TarjetaUsuarioComponent,
    MenuPerfilComponent,
    ClientesComponent,
    HistorialventasComponent,
  ],
  exports:[
    CalendarioComponent,
    ProductosComponent,
    VentasComponent,
    HeaderComponent,
    TarjetaUsuarioComponent,
    MenuPerfilComponent,
    ClientesComponent,
    HistorialventasComponent,
    

  ],
  imports: [
    CommonModule,
    IonicModule,
    NgCalendarModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  entryComponents:[
    ClientesComponent,
    VentasComponent,
    HistorialventasComponent,
  ]
})
export class ComponentsModule { }
