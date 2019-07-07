import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { TemaComponent } from './tema/tema/tema.component';
import { FormularioTemaComponent } from './tema/formulario-tema/formulario-tema.component';
import { ComunRoutingModule } from './comun.routing';
import { DiscusionTemaComponent } from '../tema/discusion-tema/discusion-tema.component'

@NgModule({
  declarations: [PerfilComponent, TemaComponent, FormularioTemaComponent, DiscusionTemaComponent],
  imports: [
    CommonModule,
    ComunRoutingModule
  ]
})
export class ComunModule { }
