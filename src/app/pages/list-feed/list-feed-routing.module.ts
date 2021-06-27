import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeleteRawComponent } from './delete-raw/delete-raw.component';
import { ListOfRawComponent } from './list-of-raw/list-of-raw.component';

const routes: Routes = [
  {
    path:"",
    children:[
      {path:"",component:ListOfRawComponent},
      {path:"delete",component:DeleteRawComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListFeedRoutingModule { }
