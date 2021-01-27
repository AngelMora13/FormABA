import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesarrolloComponent } from './desarrollo.component';

const routes: Routes = [{ path: '', component: DesarrolloComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesarrolloRoutingModule { }
