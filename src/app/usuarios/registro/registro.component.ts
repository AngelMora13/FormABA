import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroUsuario } from 'src/app/core/registro-usuario';
import { UsuarioService } from 'src/app/core/usuario.service';

declare const grecaptcha: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  @ViewChild('formRegistro') formRegistro: NgForm;
  nuevoUsuario: RegistroUsuario = {
    nombre: '',
    apellido: '',
    correo: '',
    cargo: 0,
  };
  nuevaEmpresa: RegistroUsuario = {
    nombre: '',
    acronimo: '',
    correo: '',
  };
  tipoPersona: boolean = true;
  newPassword: string;
  confirPassword: string;
  constructor(private router: Router, private loginService: UsuarioService) {}
  onRegistrarPersona({
    value,
    valid,
  }: {
    value: RegistroUsuario;
    valid: boolean;
  },overlay:HTMLDivElement) {
    if (!valid) {
      alert('Los datos no son validos');
      return;
    } else if (this.nuevoUsuario.cargo === 0) {
      alert('Debe Seleccionar un Lugar de Trabajo');
      return;
    } else if (this.newPassword != this.confirPassword) {
      alert('Las contraseñas no coinciden');
      return;
    } else {
      overlay.style.display="block"
      this.loginService.isRobot("registro").then(
        resp=>{
          if (resp['mensaje']) {
          alert(resp['mensaje']);
          overlay.style.display="none"
          return;          
        }
        this.loginService.registrarse(value.correo, value.password)
        .then(() => this.loginService.getUser())
        .then((res) =>this.loginService.saveUserInformation(res.uid,value,true))
      })
      .then(()=>this.router.navigate(["/inicio"]))
      .catch(()=>{
        alert("error inesperado")
        overlay.style.display="none"
      })
      overlay.style.display="none"
    }
  }

  onRegistrarEmpresa({
    value,
    valid,
  }: {
    value: RegistroUsuario;
    valid: boolean;
  }) {
    if (!valid) {
      alert('Los datos no son validos');
      return;
    } else if (this.newPassword != this.confirPassword) {
      alert('Las contraseñas no coinciden');
      return;
    } else {

      this.loginService.isRobot("registro").then(
        resp=>{
          if (resp['mensaje']) {
          alert(resp['mensaje']);
          return;          
        }
        this.loginService.registrarse(value.correo, value.password)
        .then(() => this.loginService.getUser())
        .then((res) =>this.loginService.saveUserInformation(res.uid,value,false))
      })
      .then(()=>this.router.navigate(["/inicio"]))
      .catch(()=>alert("error inesperado"))
    }
  }
  ngOnInit(): void {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/inicio']);
      }
    });
    const body = <HTMLDivElement>document.body;
    body.classList.add('showCaptcha');
  }
  ngOnDestroy(): void {
    const body = <HTMLDivElement>document.body;
    body.classList.remove('showCaptcha');
  }
}
