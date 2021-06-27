import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component'
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from "./register/register.component"
import { UserComponent } from './user/user.component';
const routes: Routes = [
  {
    path:"",
    children:[
      {path:"",component:UserComponent},
      {path:"login",component:LoginComponent},
      {path:"register",component:RegisterComponent},
      {path:"logout",component:LogoutComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
