import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

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
}
