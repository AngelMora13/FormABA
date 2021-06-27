import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MateriaPrima } from 'src/app/interfaces/materia-prima';
import { FormuladorService } from 'src/app/services/formulador.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-delete-raw',
  templateUrl: './delete-raw.component.html',
  styleUrls: ['./delete-raw.component.css']
})
export class DeleteRawComponent implements OnInit {
  @ViewChild("notaError") notaError:ElementRef<HTMLDivElement>;
  feedstocks: MateriaPrima[] = [];
  stopLoader: boolean = false;
  constructor(
    private router: Router, 
    private loginService: UsuarioService,
    private formularService:FormuladorService
    ) { }

  onRestore(){
    this.feedstocks = this.formularService.materiasPrimas.map(mp=>({...mp}))
    return
  }
  deleteSeleccion(event: MateriaPrima) {
    const valor: number = this.feedstocks.indexOf(event);
    this.feedstocks.splice(valor, 1);
  }
  async onSaveStocks(){
    const canSave = confirm("you will not be able to undo the changes")
    if(!navigator.onLine){
      this.displayChanges("Change not made, maybe you don't have internet?")
      return 
    }
    if(canSave){
      const user = await this.loginService.getUser()
      const saveInfo = this.loginService.getall(user.uid).subscribe(async (userInfo)=>{
        userInfo.id=""
        userInfo.materiasPrimas = this.feedstocks
        this.formularService.materiasPrimas = this.feedstocks.map(mp=>({...mp}))
        const isPerson = userInfo.acronimo ? false : true
        this.loginService.saveUserInformation(user.uid,userInfo,isPerson)
        saveInfo.unsubscribe()
        this.displayChanges("Successful change")
      },
      ()=>this.displayChanges("Change not made, try Again")        
      )
    }
    return false
    
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
      : []
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

  displayChanges(changes:string){
    this.notaError.nativeElement.classList.remove("error_detalle")
    this.notaError.nativeElement.classList.add("error_detalle")
    this.notaError.nativeElement.innerHTML=changes         
    this.notaError.nativeElement.scrollIntoView({behavior: 'smooth'})
    setTimeout(()=>this.notaError.nativeElement.classList.remove("error_detalle"),3000)
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
