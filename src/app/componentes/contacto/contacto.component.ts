import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactoService } from 'src/app/core/contacto.service';
import { Mensaje } from 'src/app/core/mensaje';
declare const grecaptcha: any;
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  @ViewChild("formMensaje") formMensaje:NgForm 
  contacto:Mensaje={
    nombre:"",
    correo:"",
    asunto:"",
    mensaje:"",
    recaptcha:""
  }
  isLoading:boolean=false;
  usurpaciongrafica:string
  constructor(private contactoService:ContactoService, private router:Router) { }
  onclick(){
    grecaptcha.ready(()=>{
      grecaptcha.execute("6LeVozkaAAAAADhsVUHU7rzg4WBYgbzXjpIYZ99M",{"action":"test"}).then(
        (token:string)=>{
          return token
        })
    })

  }
  removeSpinLoading(submitButton:HTMLInputElement){
    this.isLoading=false;
    submitButton.disabled=false;                
    submitButton.classList.remove("disabledButton")                
    submitButton.classList.add("submitHover")
  }
  addSpinLoading(submitButton:HTMLInputElement){
    submitButton.disabled=true;
    submitButton.classList.add("disabledButton")
    submitButton.classList.remove("submitHover")
    this.isLoading=true;
  }
  sendMensaje({value,valid}:{value:Mensaje,valid:boolean},submitButton:HTMLInputElement){    
    if(valid){      
      this.addSpinLoading(submitButton)
      grecaptcha.ready(()=>{
        grecaptcha.execute("6LeVozkaAAAAADhsVUHU7rzg4WBYgbzXjpIYZ99M",{"action":"Contacto"})
        .then((token:string)=>value.recaptcha = token)
        .then(()=>this.contactoService.enviarMensaje(value))
        .then((resp:Object)=>{
          if(resp["mensaje"]){
            alert(resp["mensaje"])
            this.removeSpinLoading(submitButton)
            return                  
          }          
          alert("mensaje enviado con exito");
          this.removeSpinLoading(submitButton)
          this.formMensaje.resetForm();                
        })
        .catch(()=>{
              alert("Ocurrio un error inesperado, por favor utilice los otros metodos de Contacto")
              this.removeSpinLoading(submitButton)              
            })  
    })    
    }else{
      this.removeSpinLoading(submitButton)  
      alert("los datos no son validos")
    }
    
  }
  ngOnInit(): void {
    const body=<HTMLDivElement> document.body
    body.classList.add("showCaptcha")
  }
  ngOnDestroy(): void {
    const body=<HTMLDivElement> document.body
    body.classList.remove("showCaptcha")
  }
  

}
