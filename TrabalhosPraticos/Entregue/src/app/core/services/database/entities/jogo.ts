import { Estadio } from './estadio';
import { Resultado } from "./resultado";

export class Jogo{
  $key: any;
  competicao!: string;
  data!: Date;
  estadio!: Estadio;
  equipaCasa!: string;
  equipaVisitante!: string;
  resultado!: Resultado | null;
}
