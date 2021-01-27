import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesarrolloRoutingModule } from './desarrollo-routing.module';
import { DesarrolloComponent } from './desarrollo.component';


@NgModule({
  declarations: [DesarrolloComponent],
  imports: [
    CommonModule,
    DesarrolloRoutingModule
  ]
})
export class DesarrolloModule { }
