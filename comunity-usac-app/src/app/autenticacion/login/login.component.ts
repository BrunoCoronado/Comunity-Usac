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

  constructor(private Data: AutenticacionService, private sessionStorage: SessionStorageService, private router: Router, private conversacionService: ConversacionService) { }

  ngOnInit() {
    this.Data.getRoles().subscribe( data => this.roles$ = data );
  }

  iniciarSesion(registro, contrasenia, rol){
    this.Data.autenticar({ registro: registro, contrasenia: contrasenia, codigo_rol: rol }).subscribe( (data: any) => {
      if(data.length == 1){
        this.sessionStorage.store('usr', { registro: registro, rol: rol });
        if(rol == '8'){
          this.router.navigate(['comunity-usac/administrador']);
        }else{
          this.router.navigate(['comunity-usac/comun/temas']);
          this.Data.getUsuario(registro).subscribe( data => this.conversacionService.conectar(data) )
        }
      }else{
        console.log('error');
      }
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
