import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild("usuarioLista") usuarioLista:ElementRef<HTMLDivElement>  
  @Output () isRegistrarLogin=new EventEmitter<boolean>();
  isCheck:boolean=false;
  isTutorialCheck:boolean=false;
  isUsuarioCheck:boolean=false;
  isAuth:boolean=false;
  constructor(private loginService:UsuarioService, private router:Router) { }
  //funciones---------------------------------------
  openRegistrarLogin(){ 
    this.checkToFalse()
  }
  doLogout(){
    this.loginService.logout().then(()=>window.location.reload());
  }
  openTutoriales(){    
    !this.isTutorialCheck ? (this.isTutorialCheck = true) : (this.isTutorialCheck = false)
  }
  openUsuarioSettings(){    
    !this.isUsuarioCheck ? (this.isUsuarioCheck = true) : (this.isUsuarioCheck = false)
  }
  openHeader(){
    !this.isCheck ? (this.isCheck = true) : (this.isCheck = false)
  }
  checkToFalse(){    
    this.isCheck=this.isTutorialCheck=this.isUsuarioCheck=false
  }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(
      auth=>{
        if(auth){
          this.isAuth=true;
          this.usuarioLista.nativeElement.classList.add("usuario__lista_login")
        }else{          
          this.isAuth=false;
          this.usuarioLista.nativeElement.classList.remove("usuario__lista_login")
        }
      }
    )
  }

}
