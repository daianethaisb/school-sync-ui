export interface CriarDisciplinaRequest {
  nome: string;
  codigo: string;
  cargaHoraria: number;
  descricao?: string;
}

export interface AtualizarDisciplinaRequest {
  nome: string;
  codigo: string;
  cargaHoraria: number;
  descricao?: string;
}
