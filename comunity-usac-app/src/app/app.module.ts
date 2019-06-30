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
import { ActualizarFacultadComponent } from './actualizar-facultad/actualizar-facultad.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PanelAdministracionComponent,
    AdministracionFacultadComponent,
    ActualizarFacultadComponent
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
