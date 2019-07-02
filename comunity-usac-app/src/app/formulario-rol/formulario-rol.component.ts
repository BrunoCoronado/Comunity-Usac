import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-rol',
  templateUrl: './formulario-rol.component.html',
  styleUrls: ['./formulario-rol.component.css']
})
export class FormularioRolComponent implements OnInit {

  rol$: any;
  accion: string;

  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) { 
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
      this.data.postRol(rol).subscribe( data => this.router.navigate(['/administracion-rol']) );
    }else{
      const rol = {
        codigo_rol: codigo,
        nombre: nombre,
        descripcion: descripcion
      }
      this.data.putRol(rol).subscribe( data => this.router.navigate(['/administracion-rol']) );
    }
  }
}
