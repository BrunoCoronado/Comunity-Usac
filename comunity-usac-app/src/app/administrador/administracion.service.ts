import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  constructor(private http: HttpClient) { }

  getRoles(){
    return this.http.get('http://localhost:3000/comunity-usac/api/rol/');
  }

  getRol(codigo_rol){
    return this.http.get('http://localhost:3000/comunity-usac/api/rol/' + codigo_rol);
  }

  deleteRol(codigo_rol){
    return this.http.delete('http://localhost:3000/comunity-usac/api/rol/' + codigo_rol);
  }

  postRol(body){
    return this.http.post('http://localhost:3000/comunity-usac/api/rol/', body);
  }

  putRol(body){
    return this.http.put('http://localhost:3000/comunity-usac/api/rol/', body);
  }

  getFacultades(){
    return this.http.get('http://localhost:3000/comunity-usac/api/facultad/');
  } 

  getFacultad(codigo_facultad){
    return this.http.get('http://localhost:3000/comunity-usac/api/facultad/' + codigo_facultad);
  }

  deleteFacultad(codigo_facultad){
    return this.http.delete('http://localhost:3000/comunity-usac/api/facultad/' + codigo_facultad);
  }

  postFacultad(body){
    return this.http.post('http://localhost:3000/comunity-usac/api/facultad/', body);
  }

  putFacultad(body){
    return this.http.put('http://localhost:3000/comunity-usac/api/facultad/', body);
  }

  getCarreras(){
    return this.http.get('http://localhost:3000/comunity-usac/api/carrera/');
  }

  getCarrera(codigo_carrera){
    return this.http.get('http://localhost:3000/comunity-usac/api/carrera/' + codigo_carrera);
  }

  deleteCarrera(codigo_carrera){
    return this.http.delete('http://localhost:3000/comunity-usac/api/carrera/' + codigo_carrera);
  }

  postCarrera(body){
    return this.http.post('http://localhost:3000/comunity-usac/api/carrera/', body);
  }

  putCarrera(body){
    return this.http.put('http://localhost:3000/comunity-usac/api/carrera/', body);
  }

  getCiencias(){
    return this.http.get('http://localhost:3000/comunity-usac/api/ciencia/');
  }

  getCiencia(codigo_ciencia){
    return this.http.get('http://localhost:3000/comunity-usac/api/ciencia/' + codigo_ciencia);
  }

  deleteCiencia(codigo_ciencia){
    return this.http.delete('http://localhost:3000/comunity-usac/api/ciencia/' + codigo_ciencia);
  }

  postCiencia(body){
    return this.http.post('http://localhost:3000/comunity-usac/api/ciencia/', body);
  }

  putCiencia(body){
    return this.http.put('http://localhost:3000/comunity-usac/api/ciencia/', body);
  }

  postCarreraCiencia(body){
    return this.http.post('http://localhost:3000/comunity-usac/api/ciencia-carrera', body);
  }

  deleteCarreraCiencia(codigo_carrera, codigo_ciencia){
    return this.http.delete(`http://localhost:3000/comunity-usac/api/ciencia-carrera/${codigo_carrera}/${codigo_ciencia}`);
  }

  getUsuarios(){
    return this.http.get('http://localhost:3000/comunity-usac/api/usuario/'); 
  }

  getUsuario(registro){
    return this.http.get(`http://localhost:3000/comunity-usac/api/usuario/${registro}`); 
  }

  postUsuario(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/usuario/`, body);
  }

  putUsuario(body){
    return this.http.put(`http://localhost:3000/comunity-usac/api/usuario/`, body);
  }

  deleteUsuario(registro){
    return this.http.delete(`http://localhost:3000/comunity-usac/api/usuario/${registro}`);
  }

  postUsuarioRol(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/usuario-rol/`, body);
  }

  deleteUsuarioRol(registro, codigo){
    return this.http.delete(`http://localhost:3000/comunity-usac/api/usuario-rol/${registro}/${codigo}`);
  }

  postUsuarioCarrera(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/usuario-carrera/`, body);
  }

  deleteUsuarioCarrera(registro, codigo){
    return this.http.delete(`http://localhost:3000/comunity-usac/api/usuario-carrera/${registro}/${codigo}`);
  }

  postUsuarioCiencia(body){
    return this.http.post(`http://localhost:3000/comunity-usac/api/usuario-ciencia/`, body);
  }

  deleteUsuarioCiencia(registro, codigo){
    return this.http.delete(`http://localhost:3000/comunity-usac/api/usuario-ciencia/${registro}/${codigo}`);
  }
}
