import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuideRoutingModule } from './guide-routing.module';
import { GuideComponent } from './guide/guide.component';


@NgModule({
  declarations: [GuideComponent],
  imports: [
    CommonModule,
    GuideRoutingModule
  ],
  providers:[]
})
export class GuideModule { }
