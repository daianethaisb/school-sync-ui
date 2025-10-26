import { Turno } from '../enums';

export interface Turma {
  idTurma: number;
  nome: string;
  anoLetivo: number;
  serie: string;
  turno: Turno;
  sala: string;
  capacidadeMaxima: number;
  vagasDisponiveis: number;
  dataInicio: Date;
  dataFim: Date;
  ativo: boolean;
}
