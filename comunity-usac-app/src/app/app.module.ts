import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBootstrapModule } from './app-bootstrap.module';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { PanelAdministracionComponent } from './panel-administracion/panel-administracion.component';
import { AdministracionFacultadComponent } from './administracion-facultad/administracion-facultad.component';
import { ActualizarFacultadComponent } from './actualizar-facultad/actualizar-facultad.component';
import { AdministracionCarreraComponent } from './administracion-carrera/administracion-carrera.component';
import { FormularioCarreraComponent } from './formulario-carrera/formulario-carrera.component';
import { AdministracionRolComponent } from './administracion-rol/administracion-rol.component';
import { FormularioRolComponent } from './formulario-rol/formulario-rol.component';
import { AdministracionCienciaComponent } from './administracion-ciencia/administracion-ciencia.component';
import { FormularioCienciaComponent } from './formulario-ciencia/formulario-ciencia.component';
import { FormularioCienciaCarreraComponent } from './formulario-ciencia/formulario-ciencia-carrera/formulario-ciencia-carrera.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PanelAdministracionComponent,
    AdministracionFacultadComponent,
    ActualizarFacultadComponent,
    AdministracionCarreraComponent,
    FormularioCarreraComponent,
    AdministracionRolComponent,
    FormularioRolComponent,
    AdministracionCienciaComponent,
    FormularioCienciaComponent,
    FormularioCienciaCarreraComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
