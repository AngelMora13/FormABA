import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListFeedRoutingModule } from './list-feed-routing.module';
import { ListOfRawComponent } from './list-of-raw/list-of-raw.component';
import { DeleteRawComponent } from './delete-raw/delete-raw.component';


@NgModule({
  declarations: [
  ListOfRawComponent,
  DeleteRawComponent]
  ,
  imports: [
    CommonModule,
    ListFeedRoutingModule,
    FormsModule
  ],
  providers:[]
})
export class ListFeedModule { }
