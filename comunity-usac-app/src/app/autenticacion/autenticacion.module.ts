import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxWebstorageModule } from 'ngx-webstorage';

import { AutenticacionRoutingModule } from './autenticacion.routing'

import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AutenticacionRoutingModule,
    NgxWebstorageModule.forRoot(),
    FormsModule,
  ]
})
export class AutenticacionModule { }
