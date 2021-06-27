import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as crypto from 'crypto-js/';


import { RegistroUsuario } from 'src/app/interfaces/registro-usuario';
import { FormuladorService } from 'src/app/services/formulador.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
  constructor(
    private router: Router, 
    private loginService: UsuarioService,
    private formularService:FormuladorService) {}
  
  async onRegistrarPersona({
    value,
    valid,
  }: {
    value: RegistroUsuario;
    valid: boolean;
  },overlay:HTMLDivElement) {
    if (!valid) {
      alert('Data provided is not valid');
      return;
    } else if (this.nuevoUsuario.cargo === 0) {
      alert('Must select a workplace');
      return;
    } else if (this.newPassword != this.confirPassword) {
      alert('Passwords no match');
      return;
    } else {
      overlay.style.display="block" 
      const isRobot = await this.loginService.isRobot("registro")
      if(isRobot["mensaje"]){
        alert(isRobot["mensaje"])
        overlay.style.display="none"
        return  
      }else{
        this.registrarForms(value,overlay,false)
      } 
    }
  }

  async onRegistrarEmpresa({
    value,
    valid,
  }: {
    value: RegistroUsuario;
    valid: boolean;
  },overlay:HTMLDivElement) {
    if (!valid) {
      alert('Data provided is not valid');
      return;
    } else if (this.newPassword != this.confirPassword) {
      alert('Passwords no match');
      return;
    } else {    
      overlay.style.display="block" 
      const isRobot = await this.loginService.isRobot("registro")
      if(isRobot["mensaje"]){
        alert(isRobot["mensaje"])
        overlay.style.display="none"
        return  
      }else{
        this.registrarForms(value,overlay,false)
      }       
    }
  }

  async registrarForms(value: RegistroUsuario,overlay:HTMLDivElement, person:boolean){
    value.password = crypto.SHA256(value.password).toString()
    const register =  await this.loginService.registrarse(value.correo,value.password)
    const getUser =  await this.loginService.getUser()
    const save =  this.loginService.saveUserInformation(getUser.uid,value,person)
    this.formularService.materiasPrimas=null
    this.formularService.seleccionMP=[]  
    overlay.style.display="none"
    this.router.navigate(["/"])
    return 
  }
  ngOnInit(): void {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
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
