import { Sexo } from '../enums';

export interface Aluno {
  idAluno: number;
  nome: string;
  cpf: string;
  rg?: string;
  dataNascimento: Date;
  idade: number;
  sexo: Sexo;
  telefone: string;
  email: string;
  idResponsavelFinanceiro: number;
  nomeResponsavel: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  necessidadesEspeciais?: string;
  observacoes?: string;
  dataCadastro: Date;
  ativo: boolean;
}
