import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularAlimentoComponent } from './formular-alimento.component';

const routes: Routes = [{ path: '', component: FormularAlimentoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularAlimentoRoutingModule { }
