import { Component, OnInit } from '@angular/core';
import { CatedraticoService } from '../../catedratico.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-examen',
  templateUrl: './formulario-examen.component.html',
  styleUrls: ['./formulario-examen.component.css']
})
export class FormularioExamenComponent implements OnInit {

  ciencias: any = [];
  tipoPregunta: number = 1;
  preguntas: any = [];
  respuestasMultiple: any = [];

  constructor(private data: CatedraticoService, private sessionStorage: SessionStorageService, private router: Router) { }

  ngOnInit() {
      this.data.getCiencias(this.sessionStorage.retrieve('usr').registro).subscribe( data => this.ciencias = data );
  }


  updateTipoPregunta(tipo){
    this.tipoPregunta = tipo;
  }

  guardarPreguntaTexto(pregunta, respuesta){
    this.data.postPregunta({ tipo: 1, contenido: pregunta }).subscribe( (data: any) => {
      this.preguntas.push({ codigo: data.codigo_pregunta, pregunta: pregunta, tipo: 1, respuesta: respuesta });
      this.data.postRespuesta({ contenido: respuesta, codigo: data.codigo_pregunta, valor: 1 }).subscribe();
    });
  }

  guardarRespuestaMultiple(respuesta){
    this.respuestasMultiple.push({
      respuesta: respuesta,
      estado: 0
    });
  }

  cambiarEstadoRespuestaMultiple(val, indice){
    this.respuestasMultiple[indice].estado = val;
  }
  
  eliminarRespuestaMultiple(indice){
    this.respuestasMultiple.splice(indice,1);
  }

  guardarPreguntaRespuestaMultiple(pregunta){
    this.data.postPregunta({ tipo: 2, contenido: pregunta }).subscribe( (data: any) => {
      this.preguntas.push({ codigo: data.codigo_pregunta, pregunta: pregunta, tipo: 2, respuesta: this.respuestasMultiple });
      this.respuestasMultiple.forEach( element => this.data.postRespuesta({ contenido: element.respuesta, codigo: data.codigo_pregunta, valor: element.estado } ).subscribe() );
      this.respuestasMultiple = [];
    });
  }

  guardarPreguntaVerdaderoFalso(pregunta, respuesta){
    this.data.postPregunta({ tipo: 3, contenido: pregunta }).subscribe( (data: any) => {
      this.preguntas.push({ codigo: data.codigo_pregunta, pregunta: pregunta, tipo: 3, respuesta: respuesta });
      this.data.postRespuesta({ contenido: respuesta, codigo: data.codigo_pregunta, valor: 1 }).subscribe();
    });
  }

  eliminarPregunta(indice){
    this.data.deletePregunta( this.preguntas[indice].codigo ).subscribe( () => this.preguntas.splice(indice,1) );
  }

  guardarExamen(titulo, tema, ciencia){
    this.data.postExamen({ titulo: titulo, tema: tema, codigo: ciencia }).subscribe( (data: any) => {
      this.preguntas.forEach( pregunta => this.data.postPreguntaExamen({ codigo_e: data.codigo_examen, codigo_p: pregunta.codigo }).subscribe() )
      this.router.navigate(['comunity-usac/catedratico/examenes'])
    });
  }
}
