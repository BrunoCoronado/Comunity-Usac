import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../administracion.service';

@Component({
  selector: 'app-administracion-rol',
  templateUrl: './administracion-rol.component.html',
  styleUrls: ['./administracion-rol.component.css']
})
export class AdministracionRolComponent implements OnInit {

  roles$: object;

  constructor(private data: AdministracionService) { }

  ngOnInit() {
    this.obtenerRoles();
  }

  obtenerRoles(){
    this.data.getRoles().subscribe( data => this.roles$ = data );
  }

  eliminarRol(codigo){
    this.data.deleteRol(codigo).subscribe( data => { this.obtenerRoles() });
  }
}
