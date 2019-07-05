import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AdministradorRoutingModule } from './administrador/administrador.routing'
import { AutenticacionRoutingModule } from './autenticacion/autenticacion.routing'
import { ComunRoutingModule } from './comun/comun.routing'

import { AppComponent } from './app.component';
import { AppBootstrapModule } from './app-bootstrap.module';
import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from './navbar/navbar.component';

import { AdministradorModule } from './administrador/administrador.module'
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { ComunModule } from './comun/comun.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccessDeniedComponent
  ],
  imports: [
    CommonModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
