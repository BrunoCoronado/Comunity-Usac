import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelAdministracionComponent } from './panel-administracion/panel-administracion.component'
import { AdministracionFacultadComponent } from './administracion-facultad/administracion-facultad.component'


const routes: Routes = [
  { path: '', component: PanelAdministracionComponent },
  { path: 'administracion-facultad', component: AdministracionFacultadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
