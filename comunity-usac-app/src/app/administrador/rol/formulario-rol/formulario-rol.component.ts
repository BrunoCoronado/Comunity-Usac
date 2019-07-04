import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../administracion.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-rol',
  templateUrl: './formulario-rol.component.html',
  styleUrls: ['./formulario-rol.component.css']
})
export class FormularioRolComponent implements OnInit {

  rol$: any;
  accion: string;

  constructor(private data: AdministracionService, private route: ActivatedRoute, private router: Router) { 
    route.params.subscribe( data => this.rol$ = data.codigo );
  }

  ngOnInit() {
    if(this.rol$ == -1){
      this.accion = 'Crear';
    }else{
      this.accion = 'Actualizar';
      this.data.getRol(this.rol$).subscribe( data => this.rol$ = data );
    }
  }

  guardarCambios(nombre, descripcion, codigo){
    if(this.accion == 'Crear'){
      const rol = {
        nombre: nombre,
        descripcion: descripcion
      }
      this.data.postRol(rol).subscribe( data => this.router.navigate(['comunity-usac/administrador/rol/administracion-rol']) );
    }else{
      const rol = {
        codigo_rol: codigo,
        nombre: nombre,
        descripcion: descripcion
      }
      this.data.putRol(rol).subscribe( data => this.router.navigate(['comunity-usac/administrador/rol/administracion-rol']) );
    }
  }
}
