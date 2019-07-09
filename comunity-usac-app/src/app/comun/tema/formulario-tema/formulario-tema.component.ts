import { Component, OnInit } from '@angular/core';
import { ComunService } from '../../comun.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { AccesoComunService } from '../../acceso-comun.service';

@Component({
  selector: 'app-formulario-tema',
  templateUrl: './formulario-tema.component.html',
  styleUrls: ['./formulario-tema.component.css']
})
export class FormularioTemaComponent implements OnInit {

  facultades: any = [];
  carreras: any = [];
  ciencias: any = [];
  facultadesC: any = [];
  carrerasC: any = [];
  cienciasC: any = [];
  fotografias: any = [];

  constructor(private data: ComunService, private sessionStorage: SessionStorageService, private router: Router, private acceso: AccesoComunService) { }

  ngOnInit() {
    this.acceso.validarAcceso(1);
    this.data.getFacultades().subscribe( data => this.facultades = data );
    this.data.getCarreras().subscribe( data => this.carreras = data);
    this.data.getCiencias().subscribe( data => this.ciencias = data )
  }

  agregarFacultad(codigo){
    let tmp = this.facultades, index;
    for (index = 0; index < tmp.length; index++) {
      if(tmp[index].codigo == codigo){
        this.facultadesC.push(tmp[index]);
        break;
      }
    }
    this.facultades.splice(index, 1);
  }

  removerFacultad(codigo){
    let tmp = this.facultadesC, index;
    for (index = 0; index < tmp.length; index++) {
      if(tmp[index].codigo == codigo){
        this.facultades.push(tmp[index]);
        break;
      }
    }
    this.facultadesC.splice(index, 1);
  }

  agregarCarrera(codigo){
    let tmp = this.carreras, index;
    for (index = 0; index < tmp.length; index++) {
      if(tmp[index].codigo == codigo){
        this.carrerasC.push(tmp[index]);
        break;
      }
    }
    this.carreras.splice(index, 1);
  }

  removerCarrera(codigo){
    let tmp = this.carrerasC, index;
    for (index = 0; index < tmp.length; index++) {
      if(tmp[index].codigo == codigo){
        this.carreras.push(tmp[index]);
        break;
      }
    }
    this.carrerasC.splice(index, 1);
  }

  agregarCiencia(codigo){
    let tmp = this.ciencias, index;
    for (index = 0; index < tmp.length; index++) {
      if(tmp[index].codigo == codigo){
        this.cienciasC.push(tmp[index]);
        break;
      }
    }
    this.ciencias.splice(index, 1);
  }

  removerCiencia(codigo){
    let tmp = this.cienciasC, index;
    for (index = 0; index < tmp.length; index++) {
      if(tmp[index].codigo == codigo){
        this.ciencias.push(tmp[index]);
        break;
      }
    }
    this.cienciasC.splice(index, 1);
  }

  agregarFotografia(contenido){
    this.fotografias.push(contenido);
  }

  removerFotografia(contenido){
    let tmp = this.fotografias;
    for (let index = 0; index < tmp.length; index++) {
      if(tmp[index] == contenido){
        this.fotografias.splice(index, 1);
        break;
      }
    }
  }

  guardarTema(titulo, descripcion){
    this.data.postTema({ titulo: titulo, descripcion: descripcion, registro: this.sessionStorage.retrieve('usr').registro }).subscribe( (data: any) => {
      this.facultadesC.forEach( facultad => this.data.postCategoria({ codigo_facultad: facultad.codigo, codigo_tema: data.codigo_tema }).subscribe());
      this.carrerasC.forEach( carrera => this.data.postCategoria({ codigo_carrera: carrera.codigo, codigo_tema: data.codigo_tema }).subscribe() );
      this.cienciasC.forEach( ciencia => this.data.postCategoria({ codigo_ciencia: ciencia.codigo, codigo_tema: data.codigo_tema }).subscribe() );
      this.fotografias.forEach( fotografia => this.data.postMultimedia({ contenido: fotografia, codigo_tema: data.codigo_tema }).subscribe() );
      this.router.navigate(['comunity-usac/comun/temas']);
    })
  }
}
