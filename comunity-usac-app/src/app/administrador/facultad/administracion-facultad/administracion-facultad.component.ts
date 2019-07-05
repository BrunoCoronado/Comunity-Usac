import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../administracion.service'
import { AccesoAdministradorService } from '../../acceso-administrador.service';

@Component({
  selector: 'app-administracion-facultad',
  templateUrl: './administracion-facultad.component.html',
  styleUrls: ['./administracion-facultad.component.css']
})
export class AdministracionFacultadComponent implements OnInit {

  facultades$: Object;
  constructor(private data: AdministracionService, private acceso: AccesoAdministradorService) { }

  ngOnInit() {
    this.acceso.validarAcceso();
    this.obtenerFacultades();
  }

  obtenerFacultades(){
    this.data.getFacultades().subscribe( data =>{
      this.facultades$ = data;
    });
  }

  eliminarFacultad(codigo){
    this.data.deleteFacultad(codigo).subscribe( data => {
      this.obtenerFacultades();
    });
  }
}
