import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-formular-ingredientes',
  templateUrl: './formular-ingredientes.component.html',
  styleUrls: ['./formular-ingredientes.component.css']
})
export class FormularIngredientesComponent implements OnInit {
  pagina:number=1;
  imgURL:string="../../../../assets/TutorialFI/tutorial_FI_1.png"
  //Constructor---------------------
  constructor() { }
  //funciones-----------------------
  onSiguiente(){
    if(this.pagina===6){
      return
    }else{
    this.pagina++;
    this.imgURL="../../../../assets/TutorialFI/tutorial_FI_"+this.pagina+".png";
    }
  }
  onAnterior(){
    if (this.pagina===1){
      return
    }else{
    this.pagina--;    
    this.imgURL="../../../../assets/TutorialFI/tutorial_FI_"+this.pagina+".png";
    }
  }
  ngOnInit(): void {
  }

}
