import { Turno } from '../../enums';

export interface CriarTurmaRequest {
  nome: string;
  anoLetivo: number;
  serie: string;
  turno: Turno;
  sala: string;
  capacidadeMaxima: number;
  dataInicio: string;
  dataFim: string;
}

export interface AtualizarTurmaRequest {
  nome: string;
  anoLetivo: number;
  serie: string;
  turno: Turno;
  sala: string;
  capacidadeMaxima: number;
  dataInicio: string;
  dataFim: string;
}
