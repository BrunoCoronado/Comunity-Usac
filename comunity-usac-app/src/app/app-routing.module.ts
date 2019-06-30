import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelAdministracionComponent } from './panel-administracion/panel-administracion.component'
import { AdministracionFacultadComponent } from './administracion-facultad/administracion-facultad.component'
import { ActualizarFacultadComponent } from './actualizar-facultad/actualizar-facultad.component'


const routes: Routes = [
  { path: '', component: PanelAdministracionComponent },
  { path: 'administracion-facultad', component: AdministracionFacultadComponent },
  { path: 'actualizar-facultad/:codigo', component: ActualizarFacultadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
