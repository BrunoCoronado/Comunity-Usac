import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResolverExamenComponent } from './resolver-examen/resolver-examen.component'

const routes: Routes = [
    { path: 'comunity-usac/estudiante/examen', component: ResolverExamenComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EstudianteRoutingModule { }