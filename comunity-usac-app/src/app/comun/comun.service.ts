import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComunService {

  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get(`http://localhost:3000/comunity-usac/api/usuario/`); 
  }

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

  putTema(body){
    return this.http.put(`http://localhost:3000/comunity-usac/api/tema/`, body);
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

  getConversaciones(registro){
    return this.http.get(`http://localhost:3000/comunity-usac/api/conversacion/${registro}`);
  }

  postConversacion(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/conversacion/`, body);
  }

  deleteConversacion(codigo){
    return this.http.delete(`http://localhost:3000/comunity-usac/api/conversacion/${codigo}`);
  }

  getMensajeConversacion(codigo){
    return this.http.get(`http://localhost:3000/comunity-usac/api/mensaje-conversacion/${codigo}`);
  }

  postMensajeConversacion(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/mensaje-conversacion`, body);
  }

  getGrupos(registro){
    return this.http.get(`http://localhost:3000/comunity-usac/api/grupo/${registro}`);
  }

  postGrupo(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/grupo/`, body);
  }

  deleteGrupo(codigo){  
    return this.http.delete(`http://localhost:3000/comunity-usac/api/grupo/${codigo}`);
  }

  getMiembroGrupos(registro){
    return this.http.get(`http://localhost:3000/comunity-usac/api/miembro-grupo/${registro}`);
  }

  postMiembroGrupo(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/miembro-grupo/`, body);
  }

  getMensajeGrupo(codigo){
    return this.http.get(`http://localhost:3000/comunity-usac/api/mensaje-grupo/${codigo}`);
  }

  postMensajeGrupo(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/mensaje-grupo/`, body);
  }

  getEstadistica(tipo, rol = 0, ciencia = 0){
    if(rol != 0){
      if(ciencia != 0)
        return this.http.get(`http://localhost:3000/comunity-usac/api/estadistica/${tipo}/${rol}/${ciencia}`);    
      return this.http.get(`http://localhost:3000/comunity-usac/api/estadistica/${tipo}/${rol}`);    
    }
    return this.http.get(`http://localhost:3000/comunity-usac/api/estadistica/${tipo}`);
  }
}
