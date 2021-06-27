import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormulateRoutingModule } from './formulate-routing.module';

import { SelectionComponent } from './selection/selection.component';
import { FormulateComponent } from './formulate/formulate.component';
import { FeaturesComponent } from './features/features.component';
import { ResultComponent } from './result/result.component';


@NgModule({
  declarations: [
    SelectionComponent,
    FormulateComponent,
    FeaturesComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FormulateRoutingModule
  ],
  providers: [],
})
export class FormulateModule { }
