import { MateriaPrima } from "../interfaces/materia-prima";

export interface RegistroUsuario {
  id?:string;
  nombre: string;
  apellido?: string;
  acronimo?:string
  correo: string;
  password?:string;
  cargo?: number;
  materiasPrimas?:Array<MateriaPrima>;
}
