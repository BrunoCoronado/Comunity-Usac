import { Component, OnInit } from '@angular/core';
import { ConversacionService } from '../../conversacion.service';
import { SessionStorageService } from 'ngx-webstorage';
import { ComunService } from '../../comun.service';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-panel-conversaciones',
  templateUrl: './panel-conversaciones.component.html',
  styleUrls: ['./panel-conversaciones.component.css']
})
export class PanelConversacionesComponent implements OnInit {

  conectados: any = [];
  conversaciones: any = [];

  constructor(private conversacionService: ConversacionService, private sessionStorage: SessionStorageService, private data: ComunService, private router: Router) { }

  ngOnInit() {
    this.conversacionService.solicitadConectados();
    this.conversacionService.obtenerConectados().subscribe((conectados: any) => this.conectados = conectados );
    this.obtenerConversaciones();
  }

  obtenerConversaciones(){
    this.data.getConversaciones(this.sessionStorage.retrieve('usr').registro).subscribe( data => this.conversaciones = data )
  }

  crearConversacion(receptor){
    let encontrado = false, index;
    for (index = 0; index < this.conversaciones.length; index++) {
      if( this.conversaciones[index].REGISTRO_EMISOR == this.sessionStorage.retrieve('usr').registro && this.conversaciones[index].REGISTRO_RECEPTOR == receptor){
        encontrado = true;
        break;
      }else if( this.conversaciones[index].REGISTRO_RECEPTOR == this.sessionStorage.retrieve('usr').registro && this.conversaciones[index].REGISTRO_EMISOR == receptor){
        encontrado = true;
        break;
      }
    }
    if(encontrado){
      this.router.navigate([`comunity-usac/comun/conversacion/${this.conversaciones[index].CODIGO_CONVERSACION}`])
    }else{
      this.data.postConversacion( { emisor: this.sessionStorage.retrieve('usr').registro, receptor: receptor } ).subscribe( (data: any) => this.router.navigate([`comunity-usac/comun/conversacion/${data.codigo_conversacion}`]));
    }
  }
  
  eliminarConversacion(codigo){
    this.data.deleteConversacion(codigo).subscribe( () => this.obtenerConversaciones() ); 
  }
}
