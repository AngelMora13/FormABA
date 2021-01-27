import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RegistroUsuario } from './registro-usuario';

declare const grecaptcha: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Observable<RegistroUsuario>;
  usuarioCollection: AngularFirestoreCollection<RegistroUsuario>;
  UsuarioDoc: AngularFirestoreDocument<RegistroUsuario>;

  constructor(
    private authService: AngularFireAuth,
    private db: AngularFirestore,
    private http: HttpClient
  ) {}
  login(email: string, password: string) {
    return new Promise((resolve, rejects) => {
      this.authService.signInWithEmailAndPassword(email, password).then(
        (datos) => resolve(datos),
        (error) => rejects(error)
      );
    });
  }
  getUser() {
    return this.authService.currentUser;
  }
  getAuth() {
    return this.authService.authState.pipe(map((auth) => auth));
  }
  logout() {
    return this.authService.signOut();
  }
  registrarse(email: string, password: string) {
    return new Promise((resolve, rejects) => {
      this.authService.createUserWithEmailAndPassword(email, password).then(
        (datos) => resolve(datos),
        (error) => rejects(error)
      );
    });
  }
  saveUserInformation(
    userId: string,
    nuevoUsuario: RegistroUsuario,
    persona: boolean
  ) {
    if (persona) {
      const data: RegistroUsuario = {
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        cargo: nuevoUsuario.cargo,
        correo: nuevoUsuario.correo,
      };
      this.UsuarioDoc = this.db.doc<RegistroUsuario>(`usersData/${userId}`);
      this.UsuarioDoc.set(data);
    } else {
      const data: RegistroUsuario = {
        nombre: nuevoUsuario.nombre,
        acronimo: nuevoUsuario.acronimo,
        correo: nuevoUsuario.correo,
      };
      this.UsuarioDoc = this.db.doc<RegistroUsuario>(`usersData/${userId}`);
      this.UsuarioDoc.set(data);
    }
  }
  getall(userid: string) {
    this.UsuarioDoc = this.db.doc<RegistroUsuario>(`usersData/${userid}`);
    this.usuario = this.UsuarioDoc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as RegistroUsuario;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.usuario;
  }
  isRobot(accion: string) {
    const url = 'https://formulador.herokuapp.com/api/recaptcha/';
    return new Promise((resolve, rejects) => {
      grecaptcha
        .execute('6LeVozkaAAAAADhsVUHU7rzg4WBYgbzXjpIYZ99M', {
          action: accion,
        })
        .then((token: string) => {
          const data = { recaptcha: token };
          return data;
        })
        .then((data: Object) =>
          this.http
            .post(url, data)
            .toPromise()
            .then(
              (datos) => resolve(datos),
              (error) => rejects(error)
            )
        );
    });
  }
}
