import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularAlimentoRoutingModule } from './formular-alimento-routing.module';
import { FormularAlimentoComponent } from './formular-alimento.component';


@NgModule({
  declarations: [FormularAlimentoComponent],
  imports: [
    CommonModule,
    FormularAlimentoRoutingModule
  ]
})
export class FormularAlimentoModule { }
