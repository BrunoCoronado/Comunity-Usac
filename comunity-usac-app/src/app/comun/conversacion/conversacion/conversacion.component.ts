import { Component, OnInit } from '@angular/core';
import { ConversacionService } from '../../conversacion.service';
import { ComunService } from '../../comun.service';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-conversacion',
  templateUrl: './conversacion.component.html',
  styleUrls: ['./conversacion.component.css']
})
export class ConversacionComponent implements OnInit {

  mensaje: string;
  mensajes: any[] = [];
  conversacion: any = {};
  codigoConversacion: any;

  constructor(private conversacionService: ConversacionService, private data: ComunService, private route: ActivatedRoute, private sessionStorage: SessionStorageService) { 
    route.params.subscribe( data => this.codigoConversacion = data.codigo );
  }

  ngOnInit() {
    this.conversacionService.obtenerMensajes().subscribe((message: any) => {
        if(message.conversacion == this.conversacion.codigo_conversacion){
          this.mensajes.push({
            registro_emisor: message.emisor,
            registro_receptor: message.receptor,
            contenido: message.contenido
          });
        }
    });
    this.data.getMensajeConversacion(this.codigoConversacion).subscribe( (data: any) => {
      this.conversacion = {
        codigo_conversacion: data.codigo_conversacion,
        registro_emisor: data.registro_emisor,
        nombre_emisor: data.nombre_emisor,
        registro_receptor: data.registro_receptor,
        nombre_receptor: data.nombre_receptor,
      }
      this.mensajes = data.mensajes;
    });
  }

  enviarMensaje(){
    let mensaje = {
        emisor: this.sessionStorage.retrieve('usr').registro,
        receptor: (this.sessionStorage.retrieve('usr').registro == this.conversacion.registro_emisor)?this.conversacion.registro_receptor:this.conversacion.registro_emisor, 
        conversacion: this.conversacion.codigo_conversacion,
        contenido: this.mensaje
    }
    this.conversacionService.enviarMensaje(mensaje);
    this.data.postMensajeConversacion( mensaje ).subscribe();
    this.mensaje = '';
  }
}
