import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormuladorService } from 'src/app/aplicaciones/formulador.service';
import { MateriaPrima } from 'src/app/aplicaciones/materia-prima';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent implements OnInit {
  @ViewChild("notaError") notaError:ElementRef;
  materiasPrimas: MateriaPrima[]=[]
  seleccionMP: MateriaPrima[] = [];
  contadorMPSeleccion: number = 0;
  paginas:number=0;
  stopLoader:boolean=false;
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

  //constrcutor -----------------------------------------------
  constructor(private formularService:FormuladorService, private router:Router) {
    this.seleccionMP=this.formularService.seleccionMP
    }

  //funciones-----------------------------------------------
    onClick(event: MateriaPrima) {
      if (
        this.contadorMPSeleccion === this.formularService.materiasPrimas.length ||
        this.seleccionMP.some((e) => {
          return e.id === event.id;
        })
      ) {
        return;
      }
      this.seleccionMP.push(event);
      this.contadorMPSeleccion++;
    }
    onFiltro(
      valor: string="",
      inputText: HTMLInputElement,
      inputNumber: HTMLInputElement
    ) {
      const numero = parseInt(valor);
      if (numero === 1) {
        inputText.hidden = false;
        inputNumber.hidden = true;
        return;
      }
      if (numero > 1) {
        inputText.hidden = true;
        inputNumber.hidden = false;
      }
    }
    buscarFiltroPropiedad(valor: string, inputValue: number = 0) {
      const numero = parseInt(valor);
      const filtro: number = inputValue;
      this.materiasPrimas = this.formularService.materiasPrimas;
      switch (numero) {
        case 2:
          this.materiasPrimas = this.materiasPrimas
            .filter((e) => e.Humedad >= filtro)
            .sort((a, b) => a.Humedad - b.Humedad);
          break;
        case 3:
          this.materiasPrimas = this.materiasPrimas
            .filter((e) => e.Proteina >= filtro)
            .sort((a, b) => a.Proteina - b.Proteina);
          break;
        case 4:
          this.materiasPrimas = this.materiasPrimas
            .filter((e) => e.Grasa >= filtro)
            .sort((a, b) => a.Grasa - b.Grasa);
          break;
        case 5:
          this.materiasPrimas = this.materiasPrimas
            .filter((e) => e.Fibra >= filtro)
            .sort((a, b) => a.Fibra - b.Fibra);
          break;
        case 6:
          this.materiasPrimas = this.materiasPrimas
            .filter((e) => e.Cenizas >= filtro)
            .sort((a, b) => a.Cenizas - b.Cenizas);
          break;
      }
    }
    buscarFiltroNombre(inputValue: HTMLInputElement) {
      const nombre = inputValue.value.toLowerCase();
      this.materiasPrimas = this.formularService.materiasPrimas;
      this.materiasPrimas = this.materiasPrimas.filter((e) => {
        if (e.Nombre.toLowerCase().split(nombre)[1]) {
          return true;
        } else {
          return false;
        }
      });
    }
    deleteSeleccion(event: MateriaPrima) {
      const valor: number = this.seleccionMP.indexOf(event);
      this.seleccionMP.splice(valor, 1);
      this.contadorMPSeleccion--;
    }
    onPagina(){
      if(!this.seleccionMP[0] || !this.seleccionMP[1]){
        alert("Debe seleccionar al menos dos ingredientes")
        return
      } else{
        this.paginas=1
      }
    }
    onSiguiente(){
      if(!this.checkError()){
        return
      }
      if(!this.seleccionMP[0] && !this.seleccionMP[1]){
        this.displayError("Debe seleccionar al menos dos ingredientes")
        return
      } 
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
          this.router.navigate(["/ingredientes/resultado"])
        }
      ).catch(
        ()=>{
            this.displayError("Ocurrio un error inesperado")                  
        }
      )

    }
    onReset(){
      this.formularService.seleccionMP=[]
      this.seleccionMP=[]
      this.contadorMPSeleccion=0;
    }
    checkError(){
      if(
        this.perfilNutritivo.Masa > this.perfilNutritivoMaximo.Masa ||
        this.perfilNutritivo.Humedad > this.perfilNutritivoMaximo.Humedad ||
        this.perfilNutritivo.Proteina > this.perfilNutritivoMaximo.Proteina ||
        this.perfilNutritivo.Grasa > this.perfilNutritivoMaximo.Grasa ||
        this.perfilNutritivo.Fibra > this.perfilNutritivoMaximo.Fibra ||
        this.perfilNutritivo.Cenizas > this.perfilNutritivoMaximo.Cenizas
      ){
        this.displayError("Valores maximos no pueden ser menor al esperado")
        return false
      }
      if(
        this.perfilNutritivo.Masa<=0 ||
        this.perfilNutritivo.Humedad<=0 ||
        this.perfilNutritivo.Proteina<=0 ||
        this.perfilNutritivo.Grasa<=0 ||
        this.perfilNutritivo.Fibra<=0 ||
        this.perfilNutritivo.Cenizas<=0
      ){
        this.displayError("Valores esperados no pueden ser negativos o cero (0)")
        return false
      }
      return true
    }
    displayError(error:string){
      this.notaError.nativeElement.classList.remove("error_detalle")
      this.notaError.nativeElement.classList.add("error_detalle")
      this.notaError.nativeElement.innerHTML=error         
      this.notaError.nativeElement.scrollIntoView({behavior: 'smooth'})
    }
    getIngredientes(){
      this.paginas=0;
      if(this.formularService.materiasPrimas){
        this.materiasPrimas=this.formularService.materiasPrimas;
        this.stopLoader=true;
        return
      }
      this.formularService
      .getMateriasPrimas()
      .subscribe((res: MateriaPrima[]) => {
        this.materiasPrimas=res;
        this.formularService.materiasPrimas=res
        this.stopLoader=true;
      },
      ()=>{
        this.stopLoader=true;
        alert("El servidor no responde")
      })
    }
  ngOnInit(): void {
    this.getIngredientes()
  }
}
