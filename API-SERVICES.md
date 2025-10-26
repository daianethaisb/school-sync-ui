# 🔌 Resumo das Conexões com a API

## Base URL
```
https://localhost:7144/api
```

## Serviços Implementados

### 1. AlunoService
```typescript
// Listar todos
await alunoService.listarTodos(): Promise<Aluno[]>

// Buscar por ID
await alunoService.buscarPorId(id: number): Promise<Aluno>

// Listar por responsável
await alunoService.listarPorResponsavel(idResponsavel: number): Promise<Aluno[]>

// Criar
await alunoService.criar(request: CriarAlunoRequest): Promise<Aluno>

// Atualizar
await alunoService.atualizar(id: number, request: AtualizarAlunoRequest): Promise<void>

// Excluir
await alunoService.excluir(id: number): Promise<void>
```

### 2. ResponsavelFinanceiroService
```typescript
// Listar todos
await responsavelService.listarTodos(): Promise<ResponsavelFinanceiro[]>

// Buscar por ID
await responsavelService.buscarPorId(id: number): Promise<ResponsavelFinanceiro>

// Criar
await responsavelService.criar(request: CriarResponsavelFinanceiroRequest): Promise<ResponsavelFinanceiro>

// Atualizar
await responsavelService.atualizar(id: number, request: AtualizarResponsavelFinanceiroRequest): Promise<void>

// Excluir
await responsavelService.excluir(id: number): Promise<void>
```

### 3. TurmaService
```typescript
// Listar todas
await turmaService.listarTodas(): Promise<Turma[]>

// Buscar por ID
await turmaService.buscarPorId(id: number): Promise<Turma>

// Listar por ano
await turmaService.listarPorAno(ano: number): Promise<Turma[]>

// Criar
await turmaService.criar(request: CriarTurmaRequest): Promise<Turma>

// Atualizar
await turmaService.atualizar(id: number, request: AtualizarTurmaRequest): Promise<void>

// Excluir
await turmaService.excluir(id: number): Promise<void>
```

### 4. DisciplinaService
```typescript
// Listar todas
await disciplinaService.listarTodas(): Promise<Disciplina[]>

// Listar ativas
await disciplinaService.listarAtivas(): Promise<Disciplina[]>

// Buscar por ID
await disciplinaService.buscarPorId(id: number): Promise<Disciplina>

// Criar
await disciplinaService.criar(request: CriarDisciplinaRequest): Promise<Disciplina>

// Atualizar
await disciplinaService.atualizar(id: number, request: AtualizarDisciplinaRequest): Promise<void>

// Excluir
await disciplinaService.excluir(id: number): Promise<void>
```

### 5. MatriculaService
```typescript
// Listar todas
await matriculaService.listarTodas(): Promise<Matricula[]>

// Buscar por ID
await matriculaService.buscarPorId(id: number): Promise<Matricula>

// Listar por aluno
await matriculaService.listarPorAluno(idAluno: number): Promise<Matricula[]>

// Criar
await matriculaService.criar(request: CriarMatriculaRequest): Promise<Matricula>

// Atualizar
await matriculaService.atualizar(id: number, request: AtualizarMatriculaRequest): Promise<void>

// Cancelar
await matriculaService.cancelar(id: number): Promise<void>
```

### 6. NotaService
```typescript
// Listar todas
await notaService.listarTodas(): Promise<Nota[]>

// Buscar por ID
await notaService.buscarPorId(id: number): Promise<Nota>

// Listar por matrícula
await notaService.listarPorMatricula(idMatricula: number): Promise<Nota[]>

// Listar por matrícula e disciplina
await notaService.listarPorMatriculaEDisciplina(idMatricula: number, idDisciplina: number): Promise<Nota[]>

// Listar por bimestre
await notaService.listarPorBimestre(bimestre: number): Promise<Nota[]>

// Obter boletim
await notaService.obterBoletim(idMatricula: number): Promise<BoletimResponse>

// Calcular média do bimestre
await notaService.calcularMediaBimestre(idMatricula: number, idDisciplina: number, bimestre: number): Promise<MediaBimestreResponse>

// Calcular média final
await notaService.calcularMediaFinal(idMatricula: number, idDisciplina: number): Promise<MediaFinalResponse>

// Criar
await notaService.criar(request: CriarNotaRequest): Promise<Nota>

// Atualizar
await notaService.atualizar(id: number, request: AtualizarNotaRequest): Promise<void>

// Excluir
await notaService.excluir(id: number): Promise<void>
```

### 7. TurmaDisciplinaService
```typescript
// Listar por turma
await turmaDisciplinaService.listarPorTurma(idTurma: number): Promise<TurmaDisciplina[]>

// Listar por disciplina
await turmaDisciplinaService.listarPorDisciplina(idDisciplina: number): Promise<TurmaDisciplina[]>

// Vincular
await turmaDisciplinaService.vincular(request: CriarTurmaDisciplinaRequest): Promise<TurmaDisciplina>

// Atualizar professor
await turmaDisciplinaService.atualizarProfessor(id: number, request: AtualizarProfessorRequest): Promise<void>

// Desvincular
await turmaDisciplinaService.desvincular(id: number): Promise<void>
```

## Tratamento de Erros

Todos os serviços possuem tratamento de erros integrado:

```typescript
try {
  const alunos = await this._alunoService.listarTodos();
} catch (error) {
  if (error instanceof Error) {
    console.error('Erro:', error.message);
  }
}
```

Mensagens de erro personalizadas por status HTTP:
- **400**: "Dados inválidos. Verifique as informações e tente novamente."
- **404**: "Recurso não encontrado."
- **500**: "Erro interno do servidor. Tente novamente mais tarde."
- **Outros**: "Ocorreu um erro inesperado. Tente novamente."

## Configuração

Para alterar a URL da API, edite:
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7144/api'  // Altere aqui
};
```

## Uso nos Componentes

```typescript
import { Component, inject } from '@angular/core';
import { AlunoService } from '@core/services';

export class MeuComponent {
  private readonly _alunoService = inject(AlunoService);

  async carregarDados() {
    const alunos = await this._alunoService.listarTodos();
  }
}
```

## Headers HTTP

Todos os serviços usam automaticamente:
- `Content-Type: application/json`
- `Accept: application/json`

## CORS

Certifique-se de que a API permite requisições de:
```
http://localhost:4200
```
