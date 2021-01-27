import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlimentoRoutingModule } from './alimento-routing.module';
import { AlimentoComponent } from './alimento.component';


@NgModule({
  declarations: [AlimentoComponent],
  imports: [
    CommonModule,
    AlimentoRoutingModule
  ]
})
export class AlimentoModule { }
