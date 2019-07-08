import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministracionExamenComponent } from './examen/administracion-examen/administracion-examen.component'
import { FormularioExamenComponent } from './examen/formulario-examen/formulario-examen.component'

const routes: Routes = [
    { path: 'comunity-usac/catedratico/examenes', component: AdministracionExamenComponent },
    { path: 'comunity-usac/catedratico/examen/formulario', component: FormularioExamenComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CatedraticoRoutingModule { }