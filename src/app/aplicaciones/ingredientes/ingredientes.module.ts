import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientesRoutingModule } from './ingredientes-routing.module';
import { IngredientesComponent } from './ingredientes.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [IngredientesComponent],
  imports: [
    CommonModule,
    FormsModule,
    IngredientesRoutingModule
  ]
})
export class IngredientesModule { }
