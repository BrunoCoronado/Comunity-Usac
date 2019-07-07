import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComunService {

  constructor(private http: HttpClient) { }

  getUsuario(registro){
    return this.http.get(`http://localhost:3000/comunity-usac/api/usuario/${registro}`); 
  }

  putUsuario(body){
    return this.http.put(`http://localhost:3000/comunity-usac/api/usuario/`, body);
  }

  getTemas(){
    return this.http.get(`http://localhost:3000/comunity-usac/api/tema/`);
  }

  getTema(codigo){
    return this.http.get(`http://localhost:3000/comunity-usac/api/tema/${codigo}`);
  }

  postTema(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/tema/`, body);
  }

  getFacultades(){
    return this.http.get('http://localhost:3000/comunity-usac/api/facultad/');
  } 

  getCarreras(){
    return this.http.get('http://localhost:3000/comunity-usac/api/carrera/');
  }

  getCiencias(){
    return this.http.get('http://localhost:3000/comunity-usac/api/ciencia/');
  }

  postCategoria(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/tema-categoria/`, body);
  }

  postMultimedia(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/multimedia/`, body);
  }

  getMultimedia(codigo){
    return this.http.get(`http://localhost:3000/comunity-usac/api/multimedia/${codigo}`);
  }

  getRespuesta(codigo){
    return this.http.get(`http://localhost:3000/comunity-usac/api/tema-respuesta/${codigo}`);
  }

  postRespuesta(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/tema-respuesta/`, body);
  }
}
