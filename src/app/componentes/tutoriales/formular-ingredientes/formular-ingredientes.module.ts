import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularIngredientesRoutingModule } from './formular-ingredientes-routing.module';
import { FormularIngredientesComponent } from './formular-ingredientes.component';


@NgModule({
  declarations: [FormularIngredientesComponent],
  imports: [
    CommonModule,
    FormularIngredientesRoutingModule
  ]
})
export class FormularIngredientesModule { }
