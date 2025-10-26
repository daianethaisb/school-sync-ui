export interface CriarNotaRequest {
  idMatricula: number;
  idDisciplina: number;
  tipoAvaliacao: string;
  bimestre?: number;
  notaValor?: number;
  peso?: number;
  dataAvaliacao?: string;
  observacoes?: string;
}

export interface AtualizarNotaRequest {
  tipoAvaliacao: string;
  bimestre?: number;
  notaValor?: number;
  peso?: number;
  dataAvaliacao?: string;
  observacoes?: string;
}
