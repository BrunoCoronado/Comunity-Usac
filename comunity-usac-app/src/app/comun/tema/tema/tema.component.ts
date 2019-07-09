import { Component, OnInit } from '@angular/core';
import { ComunService } from '../../comun.service';
import { Router } from '@angular/router';
import { AccesoComunService } from '../../acceso-comun.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  temas: any;
  accion: number =  0;
  razon: string = "";
  titulo_clausura: string = "";
  codigo_clausura: number = 0;

  constructor(private data: ComunService, private router: Router, private acceso: AccesoComunService, private sessionStorage: SessionStorageService) { }

  ngOnInit() {
    this.acceso.validarAcceso(0);
    this.obtenerTemas();
  }
  
  obtenerTemas(){
    this.data.getTemas().subscribe( data => this.temas = data );
  }

  clausurarTema(codigo, titulo){
    if(this.sessionStorage.retrieve('usr').rol == 1){
      this.accion = 1;
      this.titulo_clausura = titulo;
      this.codigo_clausura = codigo;
    }else{
      this.data.putTema( { cod_tema: codigo, registro: this.sessionStorage.retrieve('usr').registro } ).subscribe( () => this.obtenerTemas() );
    }
  }

  clausurar(){
    this.data.putTema( { cod_tema: this.codigo_clausura, registro: this.sessionStorage.retrieve('usr').registro, razon: this.razon } ).subscribe( () => this.obtenerTemas() ); 
    this.accion = 0;
    this.razon = "" ;
  }
}
