import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js/';

import { loginForm } from 'src/app/interfaces/loginForm';
import { FormuladorService } from 'src/app/services/formulador.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin: NgForm;
  correo: string;
  password: string;
  constructor(
    private router: Router, 
    private loginService: UsuarioService, 
    private formularService: FormuladorService
    ) {}

  async onLogin({ value, valid }: { value:loginForm; valid: boolean }) {
    if (valid) {
      await this.loginService
        .login(value.correo, crypto.SHA256(value.password).toString())
        .then(() => {   
          this.formularService.materiasPrimas=null
          this.formularService.seleccionMP=[]      
          this.router.navigate(['/']);
        })
        .catch(() => {
          alert('Email or password incorrect');
        });
    } else {
      alert('Data provided is not valid');
    }
  }
  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.router.navigate(["/"])
      }
    })
  }

}
