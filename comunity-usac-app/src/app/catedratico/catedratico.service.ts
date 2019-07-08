import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatedraticoService {

  constructor(private http: HttpClient) { }

  getCiencias(registro){
    return this.http.get(`http://localhost:3000/comunity-usac/api/usuario-ciencia/${registro}`);
  }

  getExamenes(registro){
    return this.http.get(`http://localhost:3000/comunity-usac/api/examen/${registro}`);
  }

  getExamen(registro, codigo){
    return this.http.get(`http://localhost:3000/comunity-usac/api/examen/${registro}/${codigo}`);
  }

  postExamen(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/examen/`, body);
  }

  postPregunta(body){ 
    return this.http.post(`http://localhost:3000/comunity-usac/api/pregunta/`, body);
  }

  deletePregunta(codigo){
    return this.http.delete(`http://localhost:3000/comunity-usac/api/pregunta/${codigo}`);
  }

  postRespuesta(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/respuesta-examen/`, body);
  }

  postPreguntaExamen(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/pregunta-examen/`, body);
  }

  postSala(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/sala/`, body);
  }
}
