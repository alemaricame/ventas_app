import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {CalendarComponent} from 'ionic2-calendar/calendar';

/** Componentes */
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent implements OnInit {

  /* Valores de inicialización de los eventos/citas */
  event = {
    title:'',
    desc:'',
    startTime:'',
    endTime:'',
    allDay:false
  };

  /**
   * Específica los parámetros de inicialización del calendario
   */
  addevent:any;
  minDate = new Date().toISOString();
  month = new Date().getUTCMonth();
  eventSource = [];

  /** El calendario inicia en la vista por "mes" */
  calendar={
    mode:'month',
    currentDate:new Date(),
  }

  /** Título del calendario */
  viewTitle='';

  /** Selecciona el cambio de vista del calendario: día/ semana/ mes  */
  opt:string="";

  /**
   * Activa la vista del calendario
   */
  @ViewChild(CalendarComponent,null) myCal: CalendarComponent;

  /**
   * 
   * @param citasService => Obtiene las citas de la colección del servicio
   * @param alertCtrl => Plugin para alertas
   */
  constructor(
    private citasService: LoginService,
    public alertCtrl : AlertController
  ) { }

  /** Inicializa el calendario dependiendo si trae o no eventos/citas */
  ngOnInit(){
    this.addEvent();
    this.resetEvent();
  }

  /**
   * Define un reset de los eventos/citas del calendario,
   * para inicializar el calendario
   */
  resetEvent(){
    this.event = {
      title:'',
      desc:'',
      startTime:new Date().toISOString(),
      endTime: new Date().toUTCString(),
      allDay:false
    };
  
  }

/**
 * Agregar evento con los parametros de citas del servicio de login
 */
addEvent(){
    for(var i=0;i<this.citasService.loguear.citas.length;i++){
      this.addevent = {
        title:this.citasService.loguear.citas[i].nombreCliente,
        desc:this.citasService.loguear.citas[i].descCita,
        startTime:new Date(this.citasService.loguear.citas[i].fechaCita),
        endTime: new Date(this.citasService.loguear.citas[i].fechaCita),
        allDay:false
      }
          
      this.eventSource.push(this.addevent);
      this.myCal.loadEvents();
    }    

    this.resetEvent();
  }
  

  /**
   * 
   * @param mode 
   * Cambio de tipo de vista del calendario, botones de día/semana/mes
   */
  changeMode(mode){
    this.calendar.mode = mode;
  }

  /** Marca la casilla del día actual */
  today(){
    this.calendar.currentDate = new Date();
  }

  /**
   * 
   * @param event 
   * Alert que muestra a detalle el evento/cita
   */
  async onEventSelected(event){
    let alert = await this.alertCtrl.create({
      header:'Visita',
      subHeader:event.desc,
      message: event.title,
      buttons:['Aceptar']
    });
    alert.present();
  }

  
  /**
   * Son exclusivos para crear un evento/cita
   * son llamados ya que los necesita el plugin
   */
  onViewTitleChanged(){

  }

  onTimeSelected(){

  }
  onCurrentDateChanged (){

  }

}
