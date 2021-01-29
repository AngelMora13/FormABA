import { Component, OnInit } from '@angular/core';
import { FormuladorService } from 'src/app/aplicaciones/formulador.service';
import { Router } from '@angular/router';
import { MateriaPrima } from 'src/app/aplicaciones/materia-prima';

@Component({
  selector: 'app-alimento',
  templateUrl: './alimento.component.html',
  styleUrls: ['./alimento.component.css'],
})
export class AlimentoComponent implements OnInit {
  materiasPrimas: MateriaPrima[] = [];
  seleccionMP: MateriaPrima[] = [];
  contadorMPSeleccion: number = 0;
  stopLoader: boolean = false;
  //constrcutor -----------------------------------------------
  constructor(
    private formularService: FormuladorService,
    private router: Router
  ) {
    this.seleccionMP = this.formularService.seleccionMP;
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
    valor: string,
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

  onSiguiente() {
    if (!this.seleccionMP[0]) {
      alert('Debe seleccionar al menos un ingrediente');
      return;
    } else {
      this.formularService.seleccionMP = this.seleccionMP;
      this.router.navigate(['/alimento/formular']);
    }
  }
  onReset() {
    this.formularService.seleccionMP = [];
    this.seleccionMP = [];
    this.contadorMPSeleccion = 0;
  }
  getIngredientes() {
    if (this.formularService.materiasPrimas) {
      this.materiasPrimas = this.formularService.materiasPrimas;
      this.stopLoader = true;
      return;
    }
    this.formularService.getMateriasPrimas().subscribe(
      (res: MateriaPrima[]) => {
        this.materiasPrimas = res;
        this.formularService.materiasPrimas = res;
        this.stopLoader = true;
      },
      () => {
        this.stopLoader = true;
        alert('El servidor no responde');
      }
    );
  }
  ngOnInit(): void {
    this.getIngredientes();
  }
}
