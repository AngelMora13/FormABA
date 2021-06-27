import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { FormulateComponent } from './formulate/formulate.component';
import { ResultComponent } from './result/result.component';
import { SelectionComponent } from './selection/selection.component';


const routes: Routes = [
  {
    path:"",
    children:[
      {path:"",component:SelectionComponent},
      {path:"formulate",component:FormulateComponent},
      {path:"features",component:FeaturesComponent},
      {path:"features/result",component:ResultComponent}
    ],
    
    
  }
] 

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [RouterModule]
})
export class FormulateRoutingModule { }
