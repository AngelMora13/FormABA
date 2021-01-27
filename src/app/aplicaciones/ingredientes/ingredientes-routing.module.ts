import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormularGuard } from 'src/app/core/formular.guard';

import { IngredientesComponent } from './ingredientes.component';

const routes: Routes = [
  { path: '', component: IngredientesComponent },
  {
    path: 'resultado',
    loadChildren: () =>
      import('./resultados/resultados.module').then((m) => m.ResultadosModule),
      canActivate:[FormularGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientesRoutingModule {}
