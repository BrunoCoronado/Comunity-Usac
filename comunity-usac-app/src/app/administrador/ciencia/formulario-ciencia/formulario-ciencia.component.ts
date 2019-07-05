import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../administracion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccesoAdministradorService } from '../../acceso-administrador.service';

@Component({
  selector: 'app-formulario-ciencia',
  templateUrl: './formulario-ciencia.component.html',
  styleUrls: ['./formulario-ciencia.component.css']
})
export class FormularioCienciaComponent implements OnInit {

  ciencia$: any;
  accion: string;

  constructor(private data: AdministracionService, private route: ActivatedRoute, private router: Router, private acceso: AccesoAdministradorService) { 
    this.route.params.subscribe( data => this.ciencia$ = data.codigo );
  }

  ngOnInit() {
    this.acceso.validarAcceso();
    if(this.ciencia$ == -1){
      this.accion = 'Crear';
    }else{
      this.accion = 'Actualizar';
      this.data.getCiencia(this.ciencia$).subscribe( data => this.ciencia$ = data[0] );
    }
  }

  guardarCambios(continuar, codigo, nombre, descripcion){
    const ciencia = {
      codigo_ciencia: codigo,
      nombre: nombre,
      descripcion: descripcion
    }
    if(this.accion === 'Crear'){
      if(continuar)
        this.data.postCiencia(ciencia).subscribe( data => this.router.navigate([`comunity-usac/administrador/ciencia/administracion-ciencia/formulario-ciencia/carrera/${ codigo }`]));
      else
        this.data.postCiencia(ciencia).subscribe( data => this.router.navigate(['comunity-usac/administrador/ciencia/administracion-ciencia']));
    }else
      if(continuar)
        this.data.putCiencia(ciencia).subscribe( data => this.router.navigate([`comunity-usac/administrador/ciencia/administracion-ciencia/formulario-ciencia/carrera/${ codigo }`]));
      else
        this.data.putCiencia(ciencia).subscribe( data => this.router.navigate(['comunity-usac/administrador/ciencia/administracion-ciencia']));
  }
}
