import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MateriaPrima } from 'src/app/interfaces/materia-prima';
import { FormuladorService } from 'src/app/services/formulador.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-list-of-raw',
  templateUrl: './list-of-raw.component.html',
  styleUrls: ['./list-of-raw.component.css']
})
export class ListOfRawComponent implements OnInit {
  @ViewChild("notaError") notaError:ElementRef<HTMLDivElement>;
  feedstocks: MateriaPrima[] = [];
  stopLoader: boolean = false;
  constructor(
    private loginService: UsuarioService,
    private router:Router,
    private formularService:FormuladorService
    ) { }

  onRestore(){
    this.feedstocks = this.formularService.materiasPrimas.map(mp=>({...mp}))
    return
  }
  createNewRow(){
    const feedStocksMAxID = Math.max(0,...this.feedstocks.map(mp=>mp.id))
    const newFeedStock = {
      Nombre:"",
      Humedad:0,
      Proteina:0,
      Grasa:0,
      Fibra:0,
      Cenizas:0,
      id:(feedStocksMAxID+1)
    }
    this.feedstocks.push(newFeedStock)
  }
  async onSaveStocks(){
    const thereAreError = this.checkForError()
    if(!thereAreError){
      return
    }
    const canSave = confirm("you will not be able to undo the changes")
    if(!navigator.onLine){
      this.displayChanges("Change not made, maybe you don't have internet?")
      return 
    }
    if(canSave){
    const user = await this.loginService.getUser()
    const saveInfo = this.loginService.getall(user.uid).subscribe((userInfo)=>{
      userInfo.id=""
      userInfo.materiasPrimas = this.feedstocks
      this.formularService.materiasPrimas = this.feedstocks.map(mp=>({...mp}))
      const isPerson = userInfo.acronimo ? false : true
      this.loginService.saveUserInformation(user.uid,userInfo,isPerson)
      saveInfo.unsubscribe()
      this.displayChanges("Successful change")
    },
    ()=>{
      this.displayChanges("Change not made, try Again")
      saveInfo.unsubscribe()   
    }     
    )
  }
  }
  checkForError(){
    const negativeValues = this.checkNegativeValues()
    if(negativeValues){
      alert("values cannot be negative")
      return false
    }
    const thereAreDuplicateNames = this.checkDuplicateNames()
    if(thereAreDuplicateNames[0]){
      alert(`there are duplicated names: ${[...thereAreDuplicateNames]}`)
      return false
    }
    const nullNames = this.checkNullNames()
    if(nullNames){
      alert("There are empty names, please fill")
      return false
    }
    return true
  }
  checkDuplicateNames(){
    const listDuplicatedName = this.feedstocks.reduce((obj,feed)=>{
      obj[feed.Nombre]=++obj[feed.Nombre] || 0
      return obj
    },{})
    const duplicateFeed = this.feedstocks.filter((mp)=>{
      return listDuplicatedName[mp.Nombre]
    })
    const duplicate = [...new Set(duplicateFeed.map(mp=>mp.Nombre))]
    return duplicate
  }
  checkNullNames(){
    let thereAreNull = false
    this.feedstocks.forEach(mp=>{
      if(!mp.Nombre){
        thereAreNull=true
      }
      mp.Humedad = mp.Humedad || 0
      mp.Proteina = mp.Proteina || 0
      mp.Grasa = mp.Grasa || 0
      mp.Fibra = mp.Fibra || 0
      mp.Cenizas = mp.Cenizas || 0
    })
    return thereAreNull
  }
  checkNegativeValues(){
    const negativeValues = this.feedstocks.some(mp=>{
      const booleanVaues = [
        mp.Cenizas<0,
        mp.Fibra<0,
        mp.Grasa<0,
        mp.Proteina<0,
        mp.Humedad<0,
        isNaN(mp.Cenizas),
        isNaN(mp.Fibra),
        isNaN(mp.Grasa),
        isNaN(mp.Proteina),
        isNaN(mp.Humedad)
      ]
      if(booleanVaues.includes(true)){
        return true
      }else{
        return false
      }
    })
    return negativeValues
  }
  onChangeName(input:HTMLInputElement){
    input.classList.remove("inValidInput")
    if(!input.value){
      input.classList.add("inValidInput")
      alert("There are empty names, please fill")
      return
    }
    const feedNames = this.feedstocks.map(mp=>mp.Nombre)
    const feedIndex = this.feedstocks.findIndex(mp => mp.Nombre===input.value)
    feedNames.splice(feedIndex,1)
    const thereIsName = feedNames.includes(input.value)
    if(thereIsName){
      input.classList.add("inValidInput")
      alert(`this name already exist: ${input.value}`)
      return
    }
    return
  }

  onChangeProps(input:HTMLInputElement){
    const number = parseFloat(input.value)
    input.classList.remove("inValidInput")
    if(isNaN(number)){
      input.classList.add("inValidInput")
      alert("just numbers, please")
    }
    if(number<0){
      input.classList.add("inValidInput")
      alert("this value cannot be negative")
    }
    return
  }

  displayChanges(changes:string){
    this.notaError.nativeElement.classList.remove("error_detalle")
    this.notaError.nativeElement.classList.add("error_detalle")
    this.notaError.nativeElement.innerHTML=changes         
    this.notaError.nativeElement.scrollIntoView({behavior: 'smooth'})
    setTimeout(()=>this.notaError.nativeElement.classList.remove("error_detalle"),3000)
  }

  async getAuthIngredientes() {
    if(this.formularService.materiasPrimas){
      this.feedstocks = this.formularService.materiasPrimas.map(mp=>({...mp}))
      this.stopLoader = true;
      return
    }
    const user = await this.loginService.getUser()
    const saveInfo = this.loginService.getall(user.uid).subscribe((userInfo)=>{
      this.formularService.materiasPrimas = userInfo.materiasPrimas
      ? userInfo.materiasPrimas.sort(
        (raw,nextRaw)=>raw.Nombre.localeCompare(nextRaw.Nombre)
      )
      :  []
      this.feedstocks = this.formularService.materiasPrimas.map(mp=>({...mp}))
      this.stopLoader = true
      saveInfo.unsubscribe()
    },
    ()=>{
      this.stopLoader = true;
      alert('El servidor no responde');
      saveInfo.unsubscribe()
    })
  }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.getAuthIngredientes();
      }else{
        this.router.navigate(["user/login"])
      }
    })
    
  }

}
