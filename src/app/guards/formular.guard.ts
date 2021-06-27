import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FormuladorService } from '../services/formulador.service';

@Injectable({
  providedIn: 'root'
})
export class FormularGuard implements CanActivate {
  constructor(private router:Router, private formularService:FormuladorService){}
  canActivate(){
    if (!this.formularService.seleccionMP[0]){
      this.router.navigate(["/inicio"]);
      return false;
    }else{
      return true;
    }
  }
  
}
