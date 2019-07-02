import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelAdministracionComponent } from './panel-administracion/panel-administracion.component'
import { AdministracionFacultadComponent } from './administracion-facultad/administracion-facultad.component'
import { ActualizarFacultadComponent } from './actualizar-facultad/actualizar-facultad.component'
import { AdministracionCarreraComponent } from './administracion-carrera/administracion-carrera.component'
import { FormularioCarreraComponent } from './formulario-carrera/formulario-carrera.component'
import { AdministracionRolComponent } from './administracion-rol/administracion-rol.component'
import { FormularioRolComponent } from './formulario-rol/formulario-rol.component'
import { AdministracionCienciaComponent } from './administracion-ciencia/administracion-ciencia.component'
import { FormularioCienciaComponent } from './formulario-ciencia/formulario-ciencia.component'
import { FormularioCienciaCarreraComponent } from './formulario-ciencia/formulario-ciencia-carrera/formulario-ciencia-carrera.component'

const routes: Routes = [
  { path: '', component: PanelAdministracionComponent },
  { path: 'administracion-facultad', component: AdministracionFacultadComponent },
  { path: 'actualizar-facultad/:codigo', component: ActualizarFacultadComponent },
  { path: 'administracion-carrera', component: AdministracionCarreraComponent },
  { path: 'formulario-carrera/:codigo', component: FormularioCarreraComponent },
  { path: 'administracion-rol', component: AdministracionRolComponent },
  { path: 'formulario-rol/:codigo', component: FormularioRolComponent },
  { path: 'administracion-ciencia', component: AdministracionCienciaComponent },
  { path: 'formulario-ciencia/:codigo', component: FormularioCienciaComponent },
  { path: 'formulario-ciencia/carrera/:codigo', component: FormularioCienciaCarreraComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
