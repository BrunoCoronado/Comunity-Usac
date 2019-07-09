import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComunService } from '../../comun.service';
import { ConversacionService } from '../../conversacion.service';
import { SessionStorageService } from 'ngx-webstorage';
import { AccesoComunService } from '../../acceso-comun.service';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.component.html',
  styleUrls: ['./sala.component.css']
})
export class SalaComponent implements OnInit {

  mensaje: string;
  codigoGrupo: any;
  grupo: any = {};
  mensajes: any = [];

  constructor(private route: ActivatedRoute, private data: ComunService, private conversacionService: ConversacionService, private sessionStorage: SessionStorageService, private acceso: AccesoComunService) { 
    route.params.subscribe( data => this.codigoGrupo = data.codigo );
  }

  ngOnInit() {
    this.acceso.validarAcceso(1);
    this.conversacionService.obtenerMensajes().subscribe((message: any) => {
      if(message.codigo_grupo == this.codigoGrupo){
        this.mensajes.push({
          registro_emisor: message.registro_emisor,
          contenido: message.contenido,
          codigo_grupo: message.codigo_grupo
        });
      }
  });
    this.data.getMensajeGrupo(this.codigoGrupo).subscribe( (data: any) => {
      this.grupo = {
        codigo_grupo: data.codigo_grupo,
        nombre_grupo: data.nombre_grupo
      }
      this.mensajes = data.mensajes;
    });
  }

  enviarMensaje(){
    let mensaje = {
        registro_emisor: this.sessionStorage.retrieve('usr').registro,
        contenido: this.mensaje,
        codigo_grupo: this.codigoGrupo
    }
    this.conversacionService.enviarMensaje(mensaje);
    this.data.postMensajeGrupo( {
      emisor: this.sessionStorage.retrieve('usr').registro, 
      grupo: this.codigoGrupo, 
      contenido: this.mensaje
    } ).subscribe();
    this.mensaje = '';
  }
}
