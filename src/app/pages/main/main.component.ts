import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild("Container") Container: ElementRef<HTMLDivElement>
  @ViewChild("ContainerBtn") ContainerBtn: ElementRef<HTMLDivElement>
  isAuth:boolean = false
  user: string = "Login"

  
  constructor(public loginService:UsuarioService, private router:Router) { }

  doLogout(){
    this.router.navigate(["user/logout"])
  }

  ngOnInit(): void {
    const isLogin = this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        try{
          this.isAuth=true
          this.Container.nativeElement.classList.add("ContainerAuth")
          this.Container.nativeElement.classList.remove("Container")
          this.ContainerBtn.nativeElement.classList.add("ContainerBtnAuth")
          this.ContainerBtn.nativeElement.classList.remove("ContainerBtn")
          this.user="User"
        }
        catch{
          alert("Can´t recovery user information, doing logout")
          this.doLogout()
        }
      }else{
        this.isAuth = false
        this.user = "Login"
      }
    })
  }
 

}
