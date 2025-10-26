export interface CriarTurmaDisciplinaRequest {
  idTurma: number;
  idDisciplina: number;
  professorNome: string;
}

export interface AtualizarProfessorRequest {
  professorNome: string;
}
