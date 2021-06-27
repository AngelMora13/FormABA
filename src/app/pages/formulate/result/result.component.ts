import { Component, OnInit } from '@angular/core';
import { FormuladorService } from 'src/app/services/formulador.service';
import { MateriaPrima } from 'src/app/interfaces/materia-prima';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  seleccionMP:MateriaPrima[]=[]
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
  perfilNutritivoEsperado:MateriaPrima={
    id:0,
    Nombre:"perfil Esperado",
    Masa:0,
    Humedad:0,
    Proteina:0,
    Grasa:0,
    Fibra:0,
    Cenizas:0
  }

  //constructor----------------------
  constructor(
    private formularService:FormuladorService,
    private router:Router
    ) {
    this.seleccionMP=this.formularService.seleccionMP
    this.perfilNutritivoEsperado=this.formularService.perfilEsperado
  }

  //funciones-------------------------
  resultadoPerfil(){
    this.seleccionMP.forEach((e) => {
      this.perfilNutritivo.Masa += e.Masa;
      this.perfilNutritivo.Humedad += e.Masa * e.Humedad;
      this.perfilNutritivo.Proteina += e.Masa * e.Proteina;
      this.perfilNutritivo.Grasa += e.Masa * e.Grasa;
      this.perfilNutritivo.Fibra += e.Masa * e.Fibra;
      this.perfilNutritivo.Cenizas += e.Masa * e.Cenizas;
    });
    this.perfilNutritivo.Humedad /= this.perfilNutritivo.Masa;
    this.perfilNutritivo.Proteina /= this.perfilNutritivo.Masa;
    this.perfilNutritivo.Grasa /= this.perfilNutritivo.Masa;
    this.perfilNutritivo.Fibra /= this.perfilNutritivo.Masa;
    this.perfilNutritivo.Cenizas /= this.perfilNutritivo.Masa;
  }
  ngOnInit(): void {
    if(!this.seleccionMP[0] && !this.seleccionMP[1]){
      this.router.navigate(["/selection"])
      return
    }
    this.resultadoPerfil()
  }
}
