import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

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

  getRoles(){
    return this.http.get('http://localhost:3000/comunity-usac/api/rol/');
  }

  getrol(codigo_carrera){
    return this.http.get('http://localhost:3000/comunity-usac/api/rol/' + codigo_carrera);
  }

  deleteRol(codigo_carrera){
    return this.http.delete('http://localhost:3000/comunity-usac/api/rol/' + codigo_carrera);
  }

  postRol(body){
    return this.http.post('http://localhost:3000/comunity-usac/api/rol/', body);
  }

  putRol(body){
    return this.http.put('http://localhost:3000/comunity-usac/api/rol/', body);
  }
}
