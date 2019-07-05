import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil/perfil.component';
import { TemaComponent } from './tema/tema/tema.component';
import { FormularioTemaComponent } from './tema/formulario-tema/formulario-tema.component';

@NgModule({
  declarations: [PerfilComponent, TemaComponent, FormularioTemaComponent],
  imports: [
    CommonModule
  ]
})
export class ComunModule { }
