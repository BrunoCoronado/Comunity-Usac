import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../../administracion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccesoAdministradorService } from 'src/app/administrador/acceso-administrador.service';

@Component({
  selector: 'app-formulario-ciencia-carrera',
  templateUrl: './formulario-ciencia-carrera.component.html',
  styleUrls: ['./formulario-ciencia-carrera.component.css']
})
export class FormularioCienciaCarreraComponent implements OnInit {

  ciencia$: any;
  carreras$: any;
  carrerasSelect$: any;
  facultades$: any;

  constructor(private data: AdministracionService, private route: ActivatedRoute, private router: Router, private acceso: AccesoAdministradorService) { 
    route.params.subscribe( data => this.ciencia$ = data.codigo );
  }

  ngOnInit() {
    this.acceso.validarAcceso();
    this.data.getCarreras().subscribe( data => this.carreras$ = data );
    this.data.getFacultades().subscribe( data => {
      this.facultades$ = data; 
      this.updateCarreras(this.facultades$[0].codigo); 
      this.obtenerCiencia(this.ciencia$);
    });
  }

  updateCarreras(codigo){
    this.carrerasSelect$ = [];
    this.carreras$.map( carrera => {
      if(carrera.codigof == codigo)
        this.carrerasSelect$.push(carrera);
    });
  }

  obtenerCiencia(codigo){
    this.data.getCiencia(codigo).subscribe( data => this.ciencia$ = data[0] );
  }

  agregarCiencia(codigo){
    this.data.postCarreraCiencia({codigo_carrera: codigo, codigo_ciencia: this.ciencia$.codigo}).subscribe( data => this.obtenerCiencia(this.ciencia$.codigo) );
  }

  eliminarCarrera(codigo){
    this.data.deleteCarreraCiencia(codigo, this.ciencia$.codigo).subscribe( data => this.obtenerCiencia(this.ciencia$.codigo) );
  }
}
