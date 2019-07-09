import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AccesoEstudianteService {

  constructor(private sessionStorage: SessionStorageService, private router: Router) { }

  validarAcceso(){
    let usr = this.sessionStorage.retrieve('usr');
    if(usr){
      if(usr.rol != 2){
        this.router.navigate(['comunity-usac/access-denied']);
      }
    }else{
      this.router.navigate(['comunity-usac/access-denied']);
    }
  }  
}
