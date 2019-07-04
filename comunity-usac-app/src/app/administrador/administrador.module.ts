import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador.routing';

import { PanelAdministracionComponent } from './panel-administracion/panel-administracion.component';
import { AdministracionRolComponent } from './rol/administracion-rol/administracion-rol.component';
import { FormularioRolComponent } from './rol/formulario-rol/formulario-rol.component';
import { AdministracionFacultadComponent } from './facultad/administracion-facultad/administracion-facultad.component';
import { ActualizarFacultadComponent } from './facultad/actualizar-facultad/actualizar-facultad.component';
import { AdministracionCarreraComponent } from './carrera/administracion-carrera/administracion-carrera.component';
import { FormularioCarreraComponent } from './carrera/formulario-carrera/formulario-carrera.component';
import { AdministracionCienciaComponent } from './ciencia/administracion-ciencia/administracion-ciencia.component';
import { FormularioCienciaComponent } from './ciencia/formulario-ciencia/formulario-ciencia.component';
import { FormularioCienciaCarreraComponent } from './ciencia/formulario-ciencia/formulario-ciencia-carrera/formulario-ciencia-carrera.component';
import { AdministracionUsuarioComponent } from './usuario/administracion-usuario/administracion-usuario.component'


@NgModule({
  declarations: [
    PanelAdministracionComponent,
    AdministracionRolComponent,
    FormularioRolComponent,
    AdministracionFacultadComponent,
    ActualizarFacultadComponent,
    AdministracionCarreraComponent,
    FormularioCarreraComponent,
    AdministracionCienciaComponent,
    FormularioCienciaComponent,
    FormularioCienciaCarreraComponent,
    AdministracionUsuarioComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
  ]
})
export class AdministradorModule { }
