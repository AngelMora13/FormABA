import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formular-alimento',
  templateUrl: './formular-alimento.component.html',
  styleUrls: ['./formular-alimento.component.css']
})
export class FormularAlimentoComponent implements OnInit {
  pagina:number=1;
  imgURL:string="../../../../assets/TutorialFA/tutorial_FA_1.png"
  
  //Constructor---------------------
  constructor() { }
  //funciones-----------------------
  onSiguiente(){
    if(this.pagina===5){
      return
    }else{
    const pagina=this.pagina-1
      this.pagina++;
      this.imgURL="../../../../assets/TutorialFA/tutorial_FA_"+this.pagina+".png";
  }
  }
  onAnterior(){
    if (this.pagina===1){
      return
    }else{
    this.pagina--;    
    this.imgURL="../../../../assets/TutorialFA/tutorial_FA_"+this.pagina+".png";
  }
}
  ngOnInit(): void {
  }

}
