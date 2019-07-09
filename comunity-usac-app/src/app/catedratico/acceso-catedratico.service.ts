import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccesoCatedraticoService {

  constructor(private sessionStorage: SessionStorageService, private router: Router) { }

  validarAcceso(){
    let usr = this.sessionStorage.retrieve('usr');
    if(usr){
      if(usr.rol != 3){
        this.router.navigate(['comunity-usac/access-denied']);
      }
    }else{
      this.router.navigate(['comunity-usac/access-denied']);
    }
  }  
}
