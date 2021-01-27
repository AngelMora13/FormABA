import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormularRoutingModule } from './formular-routing.module';
import { FormularComponent } from './formular.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [FormularComponent],
  imports: [
    CommonModule,
    FormsModule,
    FormularRoutingModule
  ]
})
export class FormularModule { }
