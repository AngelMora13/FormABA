import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormuladorService } from 'src/app/services/formulador.service';
import { MateriaPrima } from 'src/app/interfaces/materia-prima';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {
  @ViewChild("notaError") notaError:ElementRef;
  seleccionMP: MateriaPrima[] = [];
  isLoading:boolean = false;
  perfilNutritivo:MateriaPrima={
    id:0,
    Nombre:"perfil",
    Masa:0,
    Humedad:0,
    Proteina:0,
    Grasa:0,
    Fibra:0,
    Cenizas:0
  }
  perfilNutritivoMaximo:MateriaPrima={
    id:1,
    Nombre:"perfilMaximo",
    Masa:0,
    Humedad:0,
    Proteina:0,
    Grasa:0,
    Fibra:0,
    Cenizas:0
  }
  constructor(private formularService:FormuladorService, private router:Router) {
    this.seleccionMP=this.formularService.seleccionMP
    }
    
  onSiguiente(){    
    if(!this.checkError()){
      return
    }
    if(!this.seleccionMP[0] && !this.seleccionMP[1]){
      this.displayError("You must select at least two feedstocks")
      return
    } 
    this.isLoading=true
    this.formularService.seleccionMP=this.seleccionMP;
    this.formularService.perfilEsperado=this.perfilNutritivo;
    this.formularService.formularIngredientes(this.perfilNutritivo,this.perfilNutritivoMaximo).then(
      (res:number[])=>{
        if(res["mensaje"]){
          this.displayError(res["mensaje"])
          return
        }
        this.seleccionMP.forEach(
          (e,index)=>e.Masa=parseFloat(res[index].toFixed(4))
            )
        this.formularService.seleccionMP=this.seleccionMP
        this.isLoading=false
        this.router.navigate(["/selection/features/result"])
      }
    ).catch(
      ()=>{
          this.isLoading=false
          setTimeout(()=>this.displayError("An unexpected error occurred"),100)                  
      }
    )

  }
  checkError(){
    const MaxValues = [
      this.perfilNutritivo.Masa > this.perfilNutritivoMaximo.Masa,
      this.perfilNutritivo.Humedad > this.perfilNutritivoMaximo.Humedad,
      this.perfilNutritivo.Proteina > this.perfilNutritivoMaximo.Proteina,
      this.perfilNutritivo.Grasa > this.perfilNutritivoMaximo.Grasa,
      this.perfilNutritivo.Fibra > this.perfilNutritivoMaximo.Fibra,
      this.perfilNutritivo.Cenizas > this.perfilNutritivoMaximo.Cenizas
    ]
    if( MaxValues.includes(true)){
      this.displayError("Maximum allowed value cannot be less than Expected value")
      return false
    }
    const minValues=[
      this.perfilNutritivo.Masa<=0,
      this.perfilNutritivo.Humedad<=0,
      this.perfilNutritivo.Proteina<=0,
      this.perfilNutritivo.Grasa<=0,
      this.perfilNutritivo.Fibra<=0,
      this.perfilNutritivo.Cenizas<=0
    ]
    if( minValues.includes(true) ){
      this.displayError("Expected value cannot be negatives or zero (0)")
      return false
    }
    return true
  }

  displayError(error:string){
    this.notaError.nativeElement.classList.remove("error_detalle")
    this.notaError.nativeElement.classList.add("error_detalle")
    this.notaError.nativeElement.innerHTML=error         
    this.notaError.nativeElement.scrollIntoView({behavior: 'smooth'})
    setTimeout(()=>this.notaError.nativeElement.classList.remove("error_detalle"),3000)
  }

  ngOnInit(): void {
    if(!this.seleccionMP[0] && !this.seleccionMP[1]){
      this.router.navigate(["/selection"])
      return
    }
  }

}
