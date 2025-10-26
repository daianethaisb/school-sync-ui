export interface EstatisticaTurma {
  idTurma: number;
  nomeTurma: string;
  totalAlunos: number;
  capacidadeMaxima: number;
  percentualOcupacao: number;
}

export interface EstatisticaDisciplina {
  idDisciplina: number;
  nomeDisciplina: string;
  mediaGeral: number;
  totalAvaliacoes: number;
}

export interface EstatisticasDashboardResponse {
  totalAlunos: number;
  totalAlunosAtivos: number;
  totalResponsaveis: number;
  totalTurmas: number;
  totalTurmasAtivas: number;
  totalDisciplinas: number;
  totalMatriculas: number;
  totalMatriculasAtivas: number;
  mediaGeralNotas: number;
  vagasDisponiveis: number;
  taxaOcupacao: number;
  estatisticasPorTurma: EstatisticaTurma[];
  estatisticasPorDisciplina: EstatisticaDisciplina[];
}
