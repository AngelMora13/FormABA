import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { userInfo } from 'src/app/interfaces/user';
import { FormuladorService } from 'src/app/services/formulador.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: userInfo = {
    name: '-',
    type: '-',
    lastName: '-',
    email: '-',
    workplace: '-',
    countMateriasPrimas: 0,
  };
  thereIsLastName = false;
  constructor(
    private loginService: UsuarioService,
    private router: Router,
    private formularService: FormuladorService
  ) {}

  async getUserInfo() {
    if(this.formularService.userInfo){
      this.user=this.formularService.userInfo
      return 
    }
    const user = await this.loginService.getUser();
    const userInfo = this.loginService.getall(user.uid).subscribe(
      (info) => {
        const job = [
          'Workplace',
          'Food industry',
          'Feed industry',
          'Student',
          'Other',
        ];
        this.user.name = info.nombre;
        this.user.lastName = info.apellido || info.acronimo;
        this.user.email = info.correo;
        this.user.workplace = job[info.cargo] || '-';
        this.user.countMateriasPrimas = info.materiasPrimas
          ? info.materiasPrimas.length
          : 0;
        this.user.type = info.acronimo ? 'Company' : 'Person';
        this.thereIsLastName = info.acronimo ? true : false;
        this.formularService.userInfo = this.user;
        userInfo.unsubscribe();
      },
      () => {
        alert('No se recupero su informacion de usuario');
        this.loginService.logout();
        this.router.navigate(['/']);
      }
    );
  }
  ngOnInit(): void {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.getUserInfo();
      } else {
        this.router.navigate(['/user/login']);
      }
    });
  }
}
