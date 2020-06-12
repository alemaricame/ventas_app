import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StorageService, Ventas} from '../../services/storage.service'
/** Interfaces */
import { Producto, Cliente } from 'src/app/interfaces/login';

/** Componentes */
import { LoginService } from 'src/app/services/login.service';
import { VentasService } from 'src/app/services/ventas.service';
import { Storage } from '@ionic/storage';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/pdfmake';

// pdfMake.vfs = pdfFonts.pdfMake.vfs;
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
})
export class VentasComponent implements OnInit {
  datosVentaPDF={
    idUser: '',
    fecha_add: '',
    id_client: '',
    total_pago: '',
    tipo_pago: null,
    monto_pagado: 0,
    saldo: 0,
    productos: []
  }

  pdfObj = null;

  items: Ventas[] = [];
  newItem: Ventas = <Ventas>{}; 

  /** Grupo para la selección del cliente */
  public ticket: FormGroup;

  /** Identifica que los clientes son tipo de la interfaz login => Cliente  */
  clientes:[]=[];
  cliente = "";
  pago="";
  montoPagado=0;
  /** Productos de carrito*/
  private carrito = [];
  private totalVenta = 0;

  /**
   * 
   * @param modalCtrl => plugin del modal
   * @param data => Obtiene los datos del servicio del login
   * @param carritoService => Envía los datos hacía el servicio que inserta la venta
   * @param fb => plugin para el form group
   * 
   */
  constructor(
    public modalCtrl : ModalController,
    private data : LoginService,
    private carritoService: VentasService,
    public fb: FormBuilder,
    private storage: Storage,
    private file: File,
    private fileOpener: FileOpener,
    private plt: Platform

  ) {
    /** Form para obtener el cliente */
    storage.get('Clientes').then((val)=>{
      this.clientes = val;
      this.data.clientes = val;
    })

    storage.get('Data').then((val) => {
      console.log(val.idUser)
      this.data.dataUser = val;
    
    });
    this.carrito = this.carritoService.getCarrito();
    // this.carritoService.getCarrito().subscribe(data=>{
    //   this.carrito = data[0];
    // })
    
  }

  /** Obtiene el producto que se selecciono para estar en el carrito y generar su venta */
  ngOnInit() {

  }

  onChangeTime(item){
    let totalp = 0;
    item.total = 0;
    totalp = Number(item.cantV)*item.precio_venta_vendedor;
    item.total = totalp;

    this.totalVentas();
  }

  totalVentas(){
    // var totalVenta = 0;
    this.totalVenta = this.carrito.reduce((i,j) => i + j.precio_venta_vendedor * j.cantV, 0);
    return this.carrito.reduce((i,j) => i + j.precio_venta_vendedor * j.cantV, 0);
    // for (let val of this.carrito) {
    //   totalVenta = Number(totalVenta + val.total);
    // }
    // return this.totalVenta = totalVenta;

  }
  /** Oculta el modal */
  dismissModal(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  /**
   * Prepara los datos para enviarlos a su registro de venta
   */
  generarVenta(){
    const date = new Date()
    const formatedDate = date.toISOString().substring(0, 10);

    if(this.cliente !== ""){
      for (let client of this.data.clientes) {
        if(client.id_client === this.cliente){
          //if(this.pago == "Efectivo"){
            let datosVenta={
              idUser: this.data.dataUser.idUser,
              fecha_add: formatedDate,
              id_client:this.cliente,
              total_pago:this.totalVenta.toString(),
              tipo_pago: this.pago,
              monto_pagado: this.montoPagado,
              saldo: Number(this.totalVenta - this.montoPagado),
              productos: this.carrito
            }
        
            this.carritoService.insertVenta(datosVenta);
            //this.storageService.addVenta(datosVenta);
          // }else{
          //   if(client.telefono !== "-" ){
          //     let datosVenta={
          //       idUser: this.data.dataUser.idUser,
          //       fecha_add: formatedDate,
          //       id_client:this.cliente,
          //       total_pago:this.totalVenta.toString(),
          //       tipo_pago: this.pago,
          //       monto_pagado: this.montoPagado,
          //       saldo: Number(this.totalVenta - this.montoPagado),
          //       productos: this.carrito
          //     }
          
          //     this.carritoService.insertVenta(datosVenta);
          //    }else{
          //     alert("Tu venta no puede ser generada si el cliente no tiene sus datos completos");
          //  }
          // }
          
        }
      }
    }else{
      alert("Selecciona un cliente")
    }
    
  }

  createPDF(){
    const date = new Date()
    const formatedDate = date.toISOString().substring(0, 10);
    let items = [];
    console.log(this.cliente);
    for (let client of this.data.clientes) {
      if(client.id_client === this.cliente){
        console.log(client);
        this.datosVentaPDF={
          idUser: this.data.dataUser.idUser,
          fecha_add: formatedDate,
          id_client: client.nombre_cte,
          total_pago:this.totalVenta.toString(),
          tipo_pago: this.pago,
          monto_pagado: this.montoPagado,
          saldo: Number(this.totalVenta - this.montoPagado),
          productos: this.carrito
        }
      }
    }

   
    for (let item of this.carrito) {
      items.push(
        {
          producto: item.descripcion,
          cantidad: item.cantV,
          total: item.total
        }
      )
    }

    var docDefinition = {
      pageSize: {
        width: 250.28,
        pageOrientation: 'portrait',
        height: 'auto'
      },
      content: [
        { text: 'MEDICEL', style: 'header', alignment: 'center' },
        { text: 'RFC: PAAF700418TX1',style: 'story', aligment: 'center'},
        { text: 'Tel: 4616683654 - 4611885851',style: 'story', aligment: 'center'},
        { text: 'Av. El Sauz #17, Valle de los Naranjos',style: 'story', aligment: 'center'},

        { text: 'Vendedor: '+this.data.dataUser.usuario, style: 'story', alignment: 'center' },

        { text: 'Cliente: '+ this.datosVentaPDF.id_client, style: 'story', alignment: 'center' },
 
        { text: 'Fecha: '+ formatedDate, style: 'story' },
 
        { text: "", style: 'story', margin: [0, 0, 0, 0] },
        {
          table: {
            headerRows: 1,
            widths: [120, 20, 35],
            body: items.map(function (item){
              return [item.producto, item.cantidad, "$ "+item.total];
            })
          }
        },

        { text: 'Total: ' + this.totalVenta,alignment: 'center' },
        { text: 'Tipo de pago : ' + this.pago,alignment: 'center' },
        { text: 'Monto pagado : ' + this.montoPagado,alignment: 'center' },


      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          aligment: 'center',
        },
        subheader: {
          fontSize: 18,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        },
        table: {
          fontSize: 12,
          margin: [0, 0, 0, 0],
          aligment: 'center'
        }
      }
    }
    this.pdfObj = pdfMake.createPdf(docDefinition);
      this.download();
    // var docDefinition = {
    //   content: [
    //     {text: 'Medicel', style: 'header'},
    //     {text: this.datosVentaPDF.fecha_add},
    //     {text: this.cliente}
    //   ]
    // }

    // this.pdfObj = pdfMake.createPDF(docDefinition);
    // this.download();
  }

  download(){
    //this.pdfObj.download();
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
 
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  
    //this.generarVenta();
  }

  eliminarProducto(item){
    this.carritoService.removeCarrito(item);
  }
}
