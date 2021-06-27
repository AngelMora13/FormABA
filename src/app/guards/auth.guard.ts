import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private router:Router,
    private loginService:UsuarioService
    ){

  }
  canLoad():Observable<boolean>{
    return this.loginService.getAuth().pipe(
      map(auth=>{
        if(auth){
          return true
        }else{
          this.router.navigate(["/user/login"])
          return false
        }
      })
    )
    
  }
  
}
