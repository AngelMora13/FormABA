import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularGuard } from 'src/app/core/formular.guard';

import { AlimentoComponent } from './alimento.component';

const routes: Routes = [
  { path: '', component: AlimentoComponent },
  {
    path: 'formular',
    loadChildren: () =>
      import('./formular/formular.module').then((m) => m.FormularModule),
      canActivate:[FormularGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlimentoRoutingModule {}
