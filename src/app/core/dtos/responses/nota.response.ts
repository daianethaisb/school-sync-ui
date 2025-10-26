export interface BoletimResponse {
  idMatricula: number;
  numeroMatricula: string;
  nomeAluno: string;
  nomeTurma: string;
  disciplinas: DisciplinaBoletim[];
}

export interface DisciplinaBoletim {
  idDisciplina: number;
  nomeDisciplina: string;
  notasPorBimestre: { [bimestre: number]: NotaBoletim[] };
  mediasPorBimestre: { [bimestre: number]: number | null };
  mediaFinal: number | null;
}

export interface NotaBoletim {
  idNota: number;
  tipoAvaliacao: string;
  notaValor: number;
  peso: number;
  dataAvaliacao: Date;
}

export interface MediaBimestreResponse {
  idMatricula: number;
  idDisciplina: number;
  bimestre: number;
  media: number;
  totalNotas: number;
}

export interface MediaFinalResponse {
  idMatricula: number;
  idDisciplina: number;
  mediaFinal: number;
}
