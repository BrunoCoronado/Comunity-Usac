import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { ComunService } from '../comun.service';
import { AccesoComunService } from '../acceso-comun.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usr: any = {};
  editable$ = false;
  uploadedFiles: Array < File > ;
  registro: number;
  @ViewChild('ffotografia', { static: false }) inputFotografia: ElementRef;

  constructor(private sessionStorage: SessionStorageService, private data: ComunService, private acceso: AccesoComunService, private router: Router) { 
    this.registro = this.sessionStorage.retrieve('usr').registro;
  }

  ngOnInit() {  
    this.acceso.validarAcceso(0);
    if(this.sessionStorage.retrieve('usr'))
      this.obtenerUsuario();
  }

  obtenerUsuario(){
    this.data.getUsuario(this.sessionStorage.retrieve('usr').registro).subscribe( data => this.usr = data[0] );
  }

  enableEditar(){
    this.editable$ = true;
  }

  guardarCambios(registro, nombre, contrasenia, correo, telefono, fotografia){
    let formData = new FormData();
    formData.append("imagen", this.uploadedFiles[0], this.uploadedFiles[0].name);
    formData.append('registro', registro);
    formData.append('nombre', nombre);
    formData.append('contrasenia', contrasenia);
    formData.append('correo', correo);
    formData.append('telefono', telefono);
    formData.append('fotografia', fotografia);
    this.editable$ = false;
    this.inputFotografia.nativeElement.value = '';
    fotografia = fotografia === ""?this.usr.fotografia:fotografia;
    this.data.putUsuario( formData ).subscribe( () => window.location.reload() );
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }
}
