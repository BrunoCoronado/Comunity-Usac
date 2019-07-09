import { Component, OnInit } from '@angular/core';
import { ComunService } from '../../comun.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { AccesoComunService } from '../../acceso-comun.service';

@Component({
  selector: 'app-formulario-sala',
  templateUrl: './formulario-sala.component.html',
  styleUrls: ['./formulario-sala.component.css']
})
export class FormularioSalaComponent implements OnInit {

  nombre: string;
  miembro: any = {};
  miembros: any = [];
  usuarios: any = [];

  constructor(private data: ComunService, private sessionStorage: SessionStorageService, private router: Router, private acceso: AccesoComunService) { }

  ngOnInit() {
    this.acceso.validarAcceso(2);
    this.data.getUsuarios().subscribe( (data: any) => {
      for (let index = 0; index < data.length; index++) {
        for (let i = 0; i < data[index].roles.length; i++) {
          if(data[index].roles[i].codigor == 9){
            this.usuarios.push(data[index]);
          }
        }
      }
    }); 
  }

  agregarMiembro(){
    let index;
    for (index = 0; index < this.usuarios.length; index++) {
      if(this.miembro.registro == this.usuarios[index].registro){
        this.miembros.push(this.miembro);
        break;
      }
    }
    this.usuarios.splice(index, 1);
    this.miembro = {};
  }

  eliminarMiembro(indice){
    this.usuarios.push(this.miembros[indice]);
    this.miembros.splice(indice, 1);
  }

  crearGrupo(){
    this.data.postGrupo( { 
      catedratico: this.sessionStorage.retrieve('usr').registro, 
      nombre: this.nombre 
    } ).subscribe( (data: any) => {
      this.miembros.forEach(element => {
        this.data.postMiembroGrupo( {
          registro: element.registro,
          grupo: data.codigo_grupo
        } ).subscribe();
      });
    })
    this.router.navigate(['comunity-usac/comun/conversaciones'])
  }
}
