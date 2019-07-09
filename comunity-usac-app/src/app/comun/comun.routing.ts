import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PerfilComponent } from './perfil/perfil.component';
import { TemaComponent } from './tema/tema/tema.component';
import { FormularioTemaComponent } from './tema/formulario-tema/formulario-tema.component';
import { DiscusionTemaComponent } from '../tema/discusion-tema/discusion-tema.component';
import { PanelConversacionesComponent } from './conversacion/panel-conversaciones/panel-conversaciones.component'
import { ConversacionComponent } from './conversacion/conversacion/conversacion.component'
import { FormularioSalaComponent } from './conversacion/formulario-sala/formulario-sala.component'
import { SalaComponent } from './conversacion/sala/sala.component'
import { EstadisticasComponent } from './estadisticas/estadisticas.component'

const routes: Routes = [
    { path: 'comunity-usac/comun/perfil', component: PerfilComponent },
    { path: 'comunity-usac/comun/temas', component: TemaComponent },
    { path: 'comunity-usac/comun/tema/formulario', component: FormularioTemaComponent },
    { path: 'comunity-usac/comun/tema/discucion-tema/:codigo', component: DiscusionTemaComponent },
    { path: 'comunity-usac/comun/conversaciones', component: PanelConversacionesComponent },
    { path: 'comunity-usac/comun/conversacion/:codigo', component: ConversacionComponent },
    { path: 'comunity-usac/comun/conversacion/sala/formulario', component: FormularioSalaComponent },
    { path: 'comunity-usac/comun/conversacion/sala/:codigo', component: SalaComponent },
    { path: 'comunity-usac/comun/estadisticas', component: EstadisticasComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ComunRoutingModule { }