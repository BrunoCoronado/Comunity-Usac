import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private http: HttpClient) { }

  getRoles(){
    return this.http.get('http://localhost:3000/comunity-usac/api/rol/');
  }

  autenticar(body){
    return this.http.post('http://localhost:3000/comunity-usac/api/autenticar', body);
  }
}
