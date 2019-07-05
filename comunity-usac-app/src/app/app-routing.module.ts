import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessDeniedComponent } from './access-denied/access-denied.component'

const routes: Routes = [
  { path: '',   redirectTo: 'comunity-usac/autenticacion/login', pathMatch: 'full' },
  { path: 'comunity-usac/access-denied', component: AccessDeniedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
