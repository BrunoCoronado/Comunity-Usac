import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerfilComponent } from './perfil/perfil.component';
import { TemaComponent } from './tema/tema/tema.component';
import { FormularioTemaComponent } from './tema/formulario-tema/formulario-tema.component';


const routes: Routes = [
    { path: 'comunity-usac/comun/perfil', component: PerfilComponent },
    { path: 'comunity-usac/comun/temas', component: TemaComponent },
    { path: 'comunity-usac/comun/tema/formulario', component: FormularioTemaComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ComunRoutingModule { }