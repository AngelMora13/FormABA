import { Component, OnInit } from '@angular/core';
import { FormuladorService } from 'src/app/aplicaciones/formulador.service';
import { MateriaPrima } from 'src/app/aplicaciones/materia-prima';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css']
})
export class FormularComponent implements OnInit {
  seleccionMP:MateriaPrima[]=[]
  id: any = {};
  masa: number = 0;
  humedad: number = 0;
  proteina: number = 0;
  grasa: number = 0;
  fibra: number = 0;
  cenizas: number = 0;
  //constructor----------------------
  constructor(private formularService:FormuladorService) {
    this.seleccionMP=this.formularService.seleccionMP
  }

  //funciones-------------------------
  
  onListo() {
    this.masa = 0;
    this.humedad = 0;
    this.proteina = 0;
    this.grasa = 0;
    this.fibra = 0;
    this.cenizas = 0;
    if (this.seleccionMP.some((e) => e.Masa < 0)) {
      alert('ERROR: No se permiten valores masicos negativos');
      const error = document.getElementById(
        this.seleccionMP.find((e)=>{return e.Masa<0}).Nombre
        );
      error.focus();
      return;
    }

    this.seleccionMP.forEach((e) => {
      if(!e.Masa){
        e.Masa=0;
      }
      this.masa += e.Masa;
      this.humedad += e.Masa * e.Humedad;
      this.proteina += e.Masa * e.Proteina;
      this.grasa += e.Masa * e.Grasa;
      this.fibra += e.Masa * e.Fibra;
      this.cenizas += e.Masa * e.Cenizas;
    });
    if(this.masa===0){
      this.humedad = this.proteina = this.grasa = this.fibra = this.cenizas = 0;
      return
    }
    this.humedad /= this.masa;
    this.proteina /= this.masa;
    this.grasa /= this.masa;
    this.fibra /= this.masa;
    this.cenizas /= this.masa;
  }
  
  onRestore() {
    this.seleccionMP.forEach((e) =>e.Masa=0)
  }

  ngOnInit(): void {
  }

}
