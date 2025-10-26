import { Sexo } from '../../enums';

export interface CriarAlunoRequest {
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  sexo: Sexo;
  telefone: string;
  email: string;
  idResponsavelFinanceiro: number;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  necessidadesEspeciais?: string;
  observacoes?: string;
}

export interface AtualizarAlunoRequest {
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  sexo: Sexo;
  telefone: string;
  email: string;
  idResponsavelFinanceiro: number;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  necessidadesEspeciais?: string;
  observacoes?: string;
}
