import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { loginForm } from 'src/app/core/loginForm';
import { RegistroUsuario } from 'src/app/core/registro-usuario';
import { UsuarioService } from 'src/app/core/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin: NgForm;
  correo: string;
  password: string;
  constructor(private router: Router, private loginService: UsuarioService) {}
  onLogin({ value, valid }: { value:loginForm; valid: boolean }) {
    if (valid) {
      this.loginService
        .login(value.correo, value.password)
        .then(() => {         
          this.router.navigate(['inicio']);
        })
        .catch((e) => {
          alert('Correo o contraseña incorrectos');
        });
    } else {
      alert('los datos suministrados no son validos');
    }
  }
  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.router.navigate(["/inicio"])
      }
    })
  }
}
