import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http:HttpClient) { }

  enviarMensaje(token:any){
    const url="https://formulador.herokuapp.com/api/contacto/"
    return new Promise((resolve,rejects)=>{
      this.http.post(url,token).toPromise().then(
        datos=>resolve(datos),
        error=>rejects(error)
      )
    })
  }
}
