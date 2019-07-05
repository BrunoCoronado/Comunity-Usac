import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../administracion.service';
import { AccesoAdministradorService } from '../../acceso-administrador.service';

@Component({
  selector: 'app-administracion-ciencia',
  templateUrl: './administracion-ciencia.component.html',
  styleUrls: ['./administracion-ciencia.component.css']
})
export class AdministracionCienciaComponent implements OnInit {

  ciencias$: any;

  constructor(private data: AdministracionService, private acceso: AccesoAdministradorService) { }

  ngOnInit() {
    this.acceso.validarAcceso();
    this.obtenerCiencias();
  }

  obtenerCiencias(){
    this.data.getCiencias().subscribe( data => this.ciencias$ = data );
  }

  eliminarCiencia(codigo){
    this.data.deleteCiencia(codigo).subscribe( data => this.obtenerCiencias() );
  }
}
