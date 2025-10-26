import { SituacaoMatricula } from '../enums';

export interface Matricula {
  idMatricula: number;
  idAluno: number;
  nomeAluno: string;
  idTurma: number;
  nomeTurma: string;
  dataMatricula: Date;
  numeroMatricula: string;
  situacao: SituacaoMatricula;
  valorMensalidade: number;
  diaVencimento: number;
  observacoes?: string;
  dataCadastro: Date;
}
