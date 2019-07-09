import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { ComunService } from '../comun.service';
import { AccesoComunService } from '../acceso-comun.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usr: any = {};
  editable$ = false;
  @ViewChild('ffotografia', { static: false }) inputFotografia: ElementRef;

  constructor(private sessionStorage: SessionStorageService, private data: ComunService, private acceso: AccesoComunService) { }

  ngOnInit() {  
    this.acceso.validarAcceso(0);
    if(this.sessionStorage.retrieve('usr'))
      this.data.getUsuario(this.sessionStorage.retrieve('usr').registro).subscribe( data => this.usr = data[0] );
  }

  enableEditar(){
    this.editable$ = true;
  }

  guardarCambios(registro, nombre, contrasenia, correo, telefono, fotografia){
    this.editable$ = false;
    this.inputFotografia.nativeElement.value = '';
    fotografia = fotografia === ""?this.usr.fotografia:fotografia;
    this.data.putUsuario({ registro: registro, nombre: nombre, contrasenia: contrasenia, correo: correo, telefono:telefono, fotografia: fotografia }).subscribe( () => this.data.getUsuario(this.sessionStorage.retrieve('usr').registro).subscribe( data => this.usr = data[0] ) );
  }
}
