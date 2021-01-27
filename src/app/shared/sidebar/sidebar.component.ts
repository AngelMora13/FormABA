import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/core/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user:string="Anonimo";
  isCheck:boolean=false;
  constructor(private loginService:UsuarioService) { }
  closeSide(){
    this.isCheck=false
  }
  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.loginService.getUser()
        .then(res=>this.loginService.getall(res.uid))
        .then(res=>{
          res.subscribe(username=>this.user=username.nombre)
        })
        .catch(()=>{
          alert("No se recupero su informacion de usuario")
          this.loginService.logout()
        })
      }
    })
  }
}
