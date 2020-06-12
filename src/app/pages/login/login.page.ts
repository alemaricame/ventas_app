import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { SMS } from '@ionic-native/sms/ngx';
import { Storage } from '@ionic/storage';

/** Componentes */
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  activeMenu:string;

  /** Form para obtener usuario y password */
  public loginForm: FormGroup;

  /**
   * 
   * @param formBuilder => plugin del form
   * @param alerCtrl => plugin de alert
   * @param login => servicio de login
   * @param sms => plugin para envío de SMS
   */
  constructor(
    public formBuilder: FormBuilder,
    public alerCtrl : AlertController,
    public login : LoginService,
    private sms: SMS,
    public menu: MenuController,
    private storage: Storage,
    public navCtrl: NavController,

  ) { 
    /** Form para obtener usuario y password */
    this.loginForm = formBuilder.group({
      usuarioRepartidor: ['', Validators.required],
      passRepartidor: ['', Validators.required]
    });
    this.menu.enable(true);
    storage.get('Data').then((val) => {
      console.log(val.idUser)
      if(val.idUser){
        this.navCtrl.navigateRoot('/home');

      }else{
        this.navCtrl.navigateRoot('/login');

      }
    });
  }

  ngOnInit() {

  }

  /** Ejecuta el login */
  guardar(){
    this.login.login(this.loginForm.value);
  }

  /**
   * Si no se encuentra la contraseña se enviará un mensaje de texto
   */
  async pass(){
    const alert = await this.alerCtrl.create({
      header:'Enviar contraseña',
      message:'Ingrese el usuario y se enviará por SMS tu contraseña',
      inputs:[
        {
          name:'usuario',
          type:'text',
          placeholder:'Usuario',
        }
      ],
      buttons:[
        {
          text:'Cerrar',
          role:'calcel',

        },
        {
          text:'Enviar',
          handler:data=>{
            this.login.recuperapass(data.usuario)
              .subscribe(resp=>{
                console.log(resp.data.content.user);
                  this.sms.send(resp.data.content.user.toString(), 'Olvidaste tu contraseña');
            })
          }
        }
      ]
    })
    alert.present();
  }

}
