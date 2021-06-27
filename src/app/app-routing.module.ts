import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path:"",
    component:MainComponent
  },
  {
    path:"selection",
    loadChildren: ()=> import("./pages/formulate/formulate.module").then( m => m.FormulateModule)
  },
  {
    path:"contact",
    loadChildren: ()=> import("./pages/contact/contact.module").then( m => m.ContactModule)
  },
  {
    path:"guide",
    loadChildren: ()=> import("./pages/guide/guide.module").then( m=> m.GuideModule)
  },
  {
    path:"user",
    loadChildren: ()=> import("./pages/user/user.module").then( m => m.UserModule)
  },
  {
    path:"list",
    canLoad:[AuthGuard],
    loadChildren: ()=> import("./pages/list-feed/list-feed.module").then( m=> m.ListFeedModule)
  },
  {
    path:"**",
    redirectTo:""
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes,{
      useHash:true
    } )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
