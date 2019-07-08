import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http: HttpClient) { }

  getSala(nombre){
    return this.http.get(`http://localhost:3000/comunity-usac/api/sala/${nombre}`);
  }

  getPreguntasExamen(codigo){
    return this.http.get(`http://localhost:3000/comunity-usac/api/pregunta-examen/${codigo}`);
  }

  postEstudianteSala(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/estudiante-sala/`, body);
  }

  postPreguntaEstudiante(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/respuesta-estudiante/`, body);
  }
}
