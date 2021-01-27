import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MateriaPrima } from './materia-prima';

@Injectable({
  providedIn: 'root',
})
export class FormuladorService {
  materiasPrimas:MateriaPrima[]
  seleccionMP: MateriaPrima[] = [];
  perfilEsperado: MateriaPrima;
  constructor(private http: HttpClient) {
  }
  getMateriasPrimas() {
    const url: string = 'https://formulador.herokuapp.com/api/materiaprima';
    return this.http.get(url)
  }
  formularIngredientes(minimo: MateriaPrima, maximo: MateriaPrima) {
    const url: string = 'https://formulador.herokuapp.com/api/formular/';
    const perfil: MateriaPrima[] = [minimo, maximo];
    this.seleccionMP.forEach((e) => (e.Masa = 0));
    return new Promise((resolve, rejects) => {
      this.http
        .post(url,[perfil, this.seleccionMP])
        .toPromise()
        .then(
          (datos) => resolve(datos),
          (error) => rejects(error)
        );
    });
  }
}
