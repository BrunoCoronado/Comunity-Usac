import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../estudiante.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { AccesoEstudianteService } from '../acceso-estudiante.service';

@Component({
  selector: 'app-resolver-examen',
  templateUrl: './resolver-examen.component.html',
  styleUrls: ['./resolver-examen.component.css']
})
export class ResolverExamenComponent implements OnInit {

  accion = 0;
  preguntasRespuestas: any = [];
  indicePregunta = 0;
  preguntaActual: any = {};
  respuestasPreguntaMultiple: any = [];
  respuestasEstudiante: any = [];  
  nota: any = 0;
  codigoSala: any;
  respuestasEstudianteInfo: any = [];

  constructor(private data: EstudianteService,  private sessionStorage: SessionStorageService, private router: Router, private acceso: AccesoEstudianteService) { }

  ngOnInit() {
    this.acceso.validarAcceso();
  }

  accederASala(nombreSala){
    this.data.getSala(nombreSala).subscribe( (data: any) => {
      if(data.length > 0){
        this.accion = 1;
        this.codigoSala = data[0].CODIGO_SALA;
        this.data.getPreguntasExamen(data[0].CODIGO_EXAMEN).subscribe( data => {
          this.preguntasRespuestas = data
          this.indicePregunta = 0;
          this.preguntaActual = this.preguntasRespuestas[this.indicePregunta];
        });
      }
    });
  }

  cambiarPregunta(){
    if((this.indicePregunta + 1) < this.preguntasRespuestas.length){
      this.preguntaActual = this.preguntasRespuestas[++this.indicePregunta];
    }
    else{
      this.accion = 3;
      this.calificarRespuestas();
    }
    if(this.preguntaActual.tipo == 2){
      this.respuestasPreguntaMultiple = this.preguntaActual.respuestas;
      for (let index = 0; index < this.respuestasPreguntaMultiple.length; index++) 
        this.respuestasPreguntaMultiple[index].estado = 0;
    } 
  }

  responderPreguntaTexto(codigoPregunta, respuesta){
    this.respuestasEstudiante.push({ codigo: codigoPregunta, tipo: 1, respuesta: respuesta });
    this.cambiarPregunta();
  }

  responderPreguntaMultiple(codigoPregunta){
    this.respuestasEstudiante.push({ codigo: codigoPregunta, tipo: 2, respuesta: this.respuestasPreguntaMultiple });
    this.cambiarPregunta();
  }

  responderPreguntaVerdaderoFalso(codigoPregunta, respuesta){
    this.respuestasEstudiante.push({ codigo: codigoPregunta, tipo: 3, respuesta: respuesta });
    this.cambiarPregunta();
  }

  cambioEnRespuestaMultiple(indice){
    this.respuestasPreguntaMultiple[indice].estado = (this.respuestasPreguntaMultiple[indice].estado == 0)?1:0;
  }

  calificarRespuestas(){
    let valorPregunta = 100/this.respuestasEstudiante.length;
    this.respuestasEstudiante.forEach(element => {
      for (let index = 0; index < this.preguntasRespuestas.length; index++) {
        if(this.preguntasRespuestas[index].codigo == element.codigo){
          if(element.tipo != 2){
            if(element.respuesta == this.preguntasRespuestas[index].respuestas[0].respuesta){
              this.nota += valorPregunta;
              this.respuestasEstudianteInfo.push({ codigo_pregunta: element.codigo, valor: valorPregunta });
            }else
              this.respuestasEstudianteInfo.push({ codigo_pregunta: element.codigo, valor: 0.0 });
          }else{
            let incorrecto = false;
            element.respuesta.forEach(respuestaEstudiante => {
              this.preguntasRespuestas[index].respuestas.forEach(elementExamen => {
                if(respuestaEstudiante.estado != elementExamen.valor){
                  incorrecto = true;
                }
              });
            });
            if(!incorrecto){
              this.nota += valorPregunta;
              this.respuestasEstudianteInfo.push({ codigo_pregunta: element.codigo, valor: valorPregunta });
            }else{
              this.respuestasEstudianteInfo.push({ codigo_pregunta: element.codigo, valor: 0.0 });
            }
          }
        }
      }
    });
    this.nota = this.nota.toFixed(2);
  }

  finalizarExamen(){
    this.data.postEstudianteSala( { codigo_sala: this.codigoSala, registro: this.sessionStorage.retrieve('usr').registro, nota: this.nota } ).subscribe( () => {
      this.respuestasEstudianteInfo.forEach(element => {
        this.data.postPreguntaEstudiante( { codigo_pregunta: element.codigo_pregunta, codigo_sala: this.codigoSala, registro: this.sessionStorage.retrieve('usr').registro, valor: element.valor } ).subscribe();
        this.router.navigate(['comunity-usac/comun/temas'])
      });
    });
  }
}

