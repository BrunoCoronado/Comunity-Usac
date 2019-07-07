import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerfilComponent } from './perfil/perfil.component';
import { TemaComponent } from './tema/tema/tema.component';
import { FormularioTemaComponent } from './tema/formulario-tema/formulario-tema.component';
import { DiscusionTemaComponent } from '../tema/discusion-tema/discusion-tema.component';


const routes: Routes = [
    { path: 'comunity-usac/comun/perfil', component: PerfilComponent },
    { path: 'comunity-usac/comun/temas', component: TemaComponent },
    { path: 'comunity-usac/comun/tema/formulario', component: FormularioTemaComponent },
    { path: 'comunity-usac/comun/tema/discucion-tema/:codigo', component: DiscusionTemaComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ComunRoutingModule { }