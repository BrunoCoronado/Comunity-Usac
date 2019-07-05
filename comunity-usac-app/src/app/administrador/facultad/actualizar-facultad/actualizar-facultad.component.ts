import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../administracion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccesoAdministradorService } from '../../acceso-administrador.service';

@Component({
  selector: 'app-actualizar-facultad',
  templateUrl: './actualizar-facultad.component.html',
  styleUrls: ['./actualizar-facultad.component.css']
})
export class ActualizarFacultadComponent implements OnInit {

  facultad$: any;
  accion: string;
  crear: boolean = true;
  constructor(private data: AdministracionService, private route: ActivatedRoute, public router: Router, private acceso: AccesoAdministradorService) { 
    this.route.params.subscribe(data => this.facultad$ = data.codigo)
  }

  ngOnInit() {
    this.acceso.validarAcceso();
    if(this.facultad$ == -1){
      this.accion = 'Crear';
      this.crear = true;
    }else{
      this.crear = false;
      this.accion = 'Actualizar';
      this.data.getFacultad(this.facultad$).subscribe( data => {
        this.facultad$ = data;
    });
    }
  }

  guardarCambios(codigo, nombre, descripcion){
      const facultad = {
        codigo_facultad: codigo,
        nombre: nombre,
        descripcion: descripcion
      }
      if(this.crear){
        this.data.postFacultad(facultad).subscribe( data =>{
          this.router.navigate(['comunity-usac/administrador/facultad/administracion-facultad']);
        });
      }else{
        this.data.putFacultad(facultad).subscribe( data =>{
          this.router.navigate(['comunity-usac/administrador/facultad/administracion-facultad']);
        });
      }
    }
}
