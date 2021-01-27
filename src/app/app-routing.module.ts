import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadingStrategy, PreloadAllModules } from '@angular/router';
import { InicioComponent } from './shared/inicio/inicio.component';

const routes: Routes = [
  { path: 'inicio',component:InicioComponent },
  { path: 'alimento', loadChildren: () => import('./aplicaciones/alimento/alimento.module').then(m => m.AlimentoModule) },
  { path: 'ingredientes', loadChildren: () => import('./aplicaciones/ingredientes/ingredientes.module').then(m => m.IngredientesModule) },
  { path: 'desarrollo', loadChildren: () => import('./componentes/desarrollo/desarrollo.module').then(m => m.DesarrolloModule) },
  { path: 'tutoriales/formularalimento', loadChildren: () => import('./componentes/tutoriales/formular-alimento/formular-alimento.module').then(m => m.FormularAlimentoModule) },
  { path: 'tutoriales/formularingredientes', loadChildren: () => import('./componentes/tutoriales/formular-ingredientes/formular-ingredientes.module').then(m => m.FormularIngredientesModule) },
  { path: 'registro', loadChildren: () => import('./usuarios/registro/registro.module').then(m => m.RegistroModule) },
  { path: 'login', loadChildren: () => import('./usuarios/login/login.module').then(m => m.LoginModule) },
  { path: 'info/contacto', loadChildren: () => import('./componentes/contacto/contacto.module').then(m => m.ContactoModule) },
  { path: '**', redirectTo:"inicio"}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy:PreloadAllModules,useHash:true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
