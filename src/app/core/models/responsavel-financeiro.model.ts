import { Sexo } from '../enums';

export interface ResponsavelFinanceiro {
  idResponsavel: number;
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: Date;
  telefone: string;
  celular: string;
  email: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  dataCadastro: Date;
  ativo: boolean;
}
