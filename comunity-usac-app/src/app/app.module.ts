import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AdministradorRoutingModule } from './administrador/administrador.routing'
import { AutenticacionRoutingModule } from './autenticacion/autenticacion.routing'
import { ComunRoutingModule } from './comun/comun.routing'
import { CatedraticoRoutingModule } from './catedratico/catedratico.routing'
import { EstudianteRoutingModule } from './estudiante/estudiante.routing'

import { AppComponent } from './app.component';
import { AppBootstrapModule } from './app-bootstrap.module';
import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from './navbar/navbar.component';

import { AdministradorModule } from './administrador/administrador.module'
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ComunModule } from './comun/comun.module';
import { CatedraticoModule } from './catedratico/catedratico.module'
import { EstudianteModule } from './estudiante/estudiante.module'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccessDeniedComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppBootstrapModule,
    AdministradorModule,
    AdministradorRoutingModule,
    AutenticacionModule,
    AutenticacionRoutingModule,
    ComunModule,
    ComunRoutingModule,
    CatedraticoModule,
    CatedraticoRoutingModule,
    EstudianteModule,
    EstudianteRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
