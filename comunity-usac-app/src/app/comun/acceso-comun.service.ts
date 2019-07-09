import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccesoComunService {

  constructor(private sessionStorage: SessionStorageService, private router: Router) { }

  validarAcceso(nivel){
    let usr = this.sessionStorage.retrieve('usr');
    if(usr){
      if(nivel == 1){
        if(usr.rol != 2 && usr.rol != 3){
          this.router.navigate(['comunity-usac/access-denied']);
        }
      }else if(nivel == 2){
        if(usr.rol != 3){
          this.router.navigate(['comunity-usac/access-denied']);
        }
      }
    }else{
      this.router.navigate(['comunity-usac/access-denied']);
    }
  }  
}
