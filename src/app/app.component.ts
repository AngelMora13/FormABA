import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './core/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  isRouting:boolean=true
  users:string
  constructor(private router:Router, private loginService:UsuarioService){
  }
  onDesactivate(){
    this.isRouting=true
  }
  checkRoute(){
    if(this.router.url==="/registro" || this.router.url==="/login"){
      this.isRouting=false
    }else{
      this.isRouting=true
    }
  }
  ngOnInit(): void {
    
  }
}
