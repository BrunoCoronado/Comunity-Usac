import { Component, OnInit } from '@angular/core';
import { CatedraticoService } from '../../catedratico.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-administracion-examen',
  templateUrl: './administracion-examen.component.html',
  styleUrls: ['./administracion-examen.component.css']
})
export class AdministracionExamenComponent implements OnInit {

  examenes: any = [];
  accion: number = 0;
  cod_examen: any;

  constructor(private data: CatedraticoService, private sessionStorage: SessionStorageService) { }

  ngOnInit() { 
      this.data.getExamenes( this.sessionStorage.retrieve('usr').registro ).subscribe( data => this.examenes = data );
  }

  cambiarALanzarExamen(codigo){
    this.accion = 1;
    this.cod_examen = codigo;
  }

  crearSala(nombreSala, tiempoSala){
    this.data.postSala({ codigo: this.cod_examen, nombre: nombreSala, tiempo: tiempoSala }).subscribe( () => this.accion = 0 );
  }
}
