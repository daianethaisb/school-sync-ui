export interface Nota {
  idNota: number;
  idMatricula: number;
  numeroMatricula: string;
  nomeAluno: string;
  idDisciplina: number;
  nomeDisciplina: string;
  tipoAvaliacao: string;
  bimestre: number;
  notaValor: number;
  peso: number;
  dataAvaliacao: Date;
  observacoes?: string;
  dataLancamento: Date;
}
