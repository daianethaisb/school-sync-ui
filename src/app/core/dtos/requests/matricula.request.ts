export interface CriarMatriculaRequest {
  idAluno: number;
  idTurma: number;
  dataMatricula: string;
  numeroMatricula: string;
  valorMensalidade: number;
  diaVencimento: number;
  observacoes?: string;
}

export interface AtualizarMatriculaRequest {
  numeroMatricula: string;
  valorMensalidade: number;
  diaVencimento: number;
  observacoes?: string;
}
