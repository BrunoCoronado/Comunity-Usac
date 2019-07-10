import { Component, OnInit } from '@angular/core';

import { AutenticacionService } from '../autenticacion.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ConversacionService } from 'src/app/comun/conversacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  roles$: any;
  error: any = false;
  registro: any;
  contrasenia: string;

  constructor(private Data: AutenticacionService, private sessionStorage: SessionStorageService, private router: Router, private conversacionService: ConversacionService) { }

  ngOnInit() {
    if(this.sessionStorage.retrieve('usr')){
      if(this.sessionStorage.retrieve('usr').rol == 1){
        this.router.navigate(['comunity-usac/administrador']);
      }else{
        this.router.navigate(['comunity-usac/comun/temas']);
      }
    }
    this.Data.getRoles().subscribe( data => this.roles$ = data );
  }

  iniciarSesion(rol){
    this.Data.autenticar({ registro: this.registro, contrasenia: this.contrasenia, codigo_rol: rol }).subscribe( (data: any) => {
      if(data.length == 1){
        this.sessionStorage.store('usr', { registro: this.registro, rol: rol });
        if(rol == '1'){
          this.router.navigate(['comunity-usac/administrador']);
        }else{
          this.router.navigate(['comunity-usac/comun/temas']);
          this.Data.getUsuario(this.registro).subscribe( data => this.conversacionService.conectar(data) )
        }
      }else{
        this.error = true;
      }
      this.registro = '';
      this.contrasenia = '';
    });
  }

  capturarRol(codigo){
    this.roles$.forEach(element => {
      if(element.codigo == codigo){
        return element.nombre;
      }
    });
  }
}
