import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxWebstorageModule } from 'ngx-webstorage';

import { AutenticacionRoutingModule } from './autenticacion.routing'

import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    NgxWebstorageModule.forRoot(),
  ]
})
export class AutenticacionModule { }
