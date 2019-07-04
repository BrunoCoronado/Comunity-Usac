import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PanelAdministracionComponent } from './panel-administracion/panel-administracion.component'
import { AdministracionRolComponent } from './rol/administracion-rol/administracion-rol.component'
import { FormularioRolComponent } from './rol/formulario-rol/formulario-rol.component'
import { AdministracionFacultadComponent } from './facultad/administracion-facultad/administracion-facultad.component'
import { ActualizarFacultadComponent } from './facultad/actualizar-facultad/actualizar-facultad.component'
import { AdministracionCarreraComponent } from './carrera/administracion-carrera/administracion-carrera.component'
import { FormularioCarreraComponent } from './carrera/formulario-carrera/formulario-carrera.component'
import { AdministracionCienciaComponent } from './ciencia/administracion-ciencia/administracion-ciencia.component'
import { FormularioCienciaComponent } from './ciencia/formulario-ciencia/formulario-ciencia.component'
import { FormularioCienciaCarreraComponent } from './ciencia/formulario-ciencia/formulario-ciencia-carrera/formulario-ciencia-carrera.component'
import { AdministracionUsuarioComponent } from './usuario/administracion-usuario/administracion-usuario.component'

const routes: Routes = [
    { path: 'comunity-usac/administrador', component: PanelAdministracionComponent },
    { path: 'comunity-usac/administrador/rol/administracion-rol', component: AdministracionRolComponent },
    { path: 'comunity-usac/administrador/rol/administracion-rol/formulario-rol/:codigo', component: FormularioRolComponent },
    { path: 'comunity-usac/administrador/facultad/administracion-facultad', component: AdministracionFacultadComponent },
    { path: 'comunity-usac/administrador/facultad/administracion-facultad/formulario-facultad/:codigo', component: ActualizarFacultadComponent },
    { path: 'comunity-usac/administrador/carrera/administracion-carrera', component: AdministracionCarreraComponent },
    { path: 'comunity-usac/administrador/carrera/administracion-carrera/formulario-carrera/:codigo', component: FormularioCarreraComponent },
    { path: 'comunity-usac/administrador/ciencia/administracion-ciencia', component: AdministracionCienciaComponent },
    { path: 'comunity-usac/administrador/ciencia/administracion-ciencia/formulario-ciencia/:codigo', component: FormularioCienciaComponent },
    { path: 'comunity-usac/administrador/ciencia/administracion-ciencia/formulario-ciencia/carrera/:codigo', component: FormularioCienciaCarreraComponent },
    { path: 'comunity-usac/administrador/usuario/administracion-usuario', component: AdministracionUsuarioComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdministradorRoutingModule { }