import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../administracion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-carrera',
  templateUrl: './formulario-carrera.component.html',
  styleUrls: ['./formulario-carrera.component.css']
})
export class FormularioCarreraComponent implements OnInit {

  accion: string;
  carrera$: any;
  facultades$: any;
  crear: boolean;

  constructor(private data: AdministracionService, private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe(data => this.carrera$ = data.codigo);
  }

  ngOnInit() {
    this.data.getFacultades().subscribe( data => this.facultades$ = data);
    if (this.carrera$ == -1) {
      this.accion = 'Crear';
      this.crear = true;
    } else {
      this.accion = 'Actualizar';
      this.crear = false;
      this.data.getCarrera(this.carrera$).subscribe( data => this.carrera$ = data );
    } 
  }

  guardarCambios(codigo, nombre, descripcion, codigof){
    const carrera = {
      codigo_carrera: codigo,
      nombre: nombre,
      descripcion: descripcion,
      codigo_facultad: codigof
    }
    if(this.crear)
      this.data.postCarrera(carrera).subscribe( data => this.router.navigate(['comunity-usac/administrador/carrera/administracion-carrera']) );
    else
      this.data.putCarrera(carrera).subscribe( data => this.router.navigate(['comunity-usac/administrador/carrera/administracion-carrera']) );
  }
}
