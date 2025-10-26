export interface CriarResponsavelFinanceiroRequest {
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
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
}

export interface AtualizarResponsavelFinanceiroRequest {
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
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
}
