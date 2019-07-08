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

@NgModule({
  declarations: [PerfilComponent, TemaComponent, FormularioTemaComponent, DiscusionTemaComponent, PanelConversacionesComponent, ConversacionComponent],
  imports: [
    CommonModule,
    ComunRoutingModule,
    FormsModule
  ],
  providers: [ConversacionService]
})
export class ComunModule { }
