import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormuladorService } from 'src/app/services/formulador.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private loginService:UsuarioService, 
    private router:Router,
    private formularService: FormuladorService) { }

  ngOnInit(): void {
    this.formularService.materiasPrimas = null
    this.formularService.userInfo = null
    this.formularService.seleccionMP = []
    this.loginService.logout().then(()=>{
      this.router.navigate(["user/login"])
    })
    

  }

}
