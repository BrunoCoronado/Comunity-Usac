import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { TemaComponent } from './tema/tema/tema.component';
import { FormularioTemaComponent } from './tema/formulario-tema/formulario-tema.component';
import { ComunRoutingModule } from './comun.routing';
import { DiscusionTemaComponent } from '../tema/discusion-tema/discusion-tema.component';
import { PanelConversacionesComponent } from './conversacion/panel-conversaciones/panel-conversaciones.component'
import { ConversacionService } from './conversacion.service';
import { ConversacionComponent } from './conversacion/conversacion/conversacion.component';

import { FormsModule } from '@angular/forms';
import { SalaComponent } from './conversacion/sala/sala.component';
import { FormularioSalaComponent } from './conversacion/formulario-sala/formulario-sala.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

@NgModule({
  declarations: [PerfilComponent, TemaComponent, FormularioTemaComponent, DiscusionTemaComponent, PanelConversacionesComponent, ConversacionComponent, SalaComponent, FormularioSalaComponent, EstadisticasComponent],
  imports: [
    CommonModule,
    ComunRoutingModule,
    FormsModule
  ],
  providers: [ConversacionService]
})
export class ComunModule { }
