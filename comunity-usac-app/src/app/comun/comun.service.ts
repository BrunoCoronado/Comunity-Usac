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
}
