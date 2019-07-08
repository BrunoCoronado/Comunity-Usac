import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionExamenComponent } from '../catedratico/examen/administracion-examen/administracion-examen.component';
import { FormularioExamenComponent } from './examen/formulario-examen/formulario-examen.component';

@NgModule({
  declarations: [AdministracionExamenComponent, FormularioExamenComponent],
  imports: [
    CommonModule
  ]
})
export class CatedraticoModule { }
