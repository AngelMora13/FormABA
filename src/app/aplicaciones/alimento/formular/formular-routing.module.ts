import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularComponent } from './formular.component';

const routes: Routes = [{ path: '', component: FormularComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormularRoutingModule { }
