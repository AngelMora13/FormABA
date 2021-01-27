import { Component, OnInit } from '@angular/core';
import { FormuladorService } from 'src/app/aplicaciones/formulador.service';
import { MateriaPrima } from 'src/app/aplicaciones/materia-prima';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
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
  constructor(private formularService:FormuladorService ) {
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
    this.resultadoPerfil()
  }


}
