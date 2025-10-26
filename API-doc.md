# SchoolSync API - Documentação Completa de Rotas

Esta documentação contém todas as rotas da API SchoolSync com exemplos de requisições cURL e respostas esperadas.

**Base URL:** `https://localhost:7000/api` (ajuste a porta conforme necessário)

---

## 📋 Índice

1. [Responsáveis Financeiros](#responsáveis-financeiros)
2. [Alunos](#alunos)
3. [Turmas](#turmas)
4. [Matrículas](#matrículas)
5. [Disciplinas](#disciplinas)
6. [Turmas-Disciplinas](#turmas-disciplinas)
7. [Notas](#notas)

---

## 👨‍👩‍👧‍👦 Responsáveis Financeiros

### 1. Listar todos os responsáveis financeiros

**Endpoint:** `GET /api/responsaveisfinanceiros`

```bash
curl -X GET "https://localhost:7000/api/responsaveisfinanceiros" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
    "idResponsavel": 1,
    "nome": "João da Silva",
    "cpf": "123.456.789-00",
    "rg": "12.345.678-9",
    "dataNascimento": "1980-05-15T00:00:00",
    "telefone": "(11) 3456-7890",
    "celular": "(11) 98765-4321",
    "email": "joao.silva@email.com",
    "cep": "01234-567",
    "logradouro": "Rua das Flores",
    "numero": "123",
    "complemento": "Apto 45",
"bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP",
    "dataCadastro": "2024-01-15T10:30:00",
    "ativo": true
  }
]
```

### 2. Buscar responsável por ID

**Endpoint:** `GET /api/responsaveisfinanceiros/{id}`

```bash
curl -X GET "https://localhost:7000/api/responsaveisfinanceiros/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
{
  "idResponsavel": 1,
  "nome": "João da Silva",
  "cpf": "123.456.789-00",
  "rg": "12.345.678-9",
  "dataNascimento": "1980-05-15T00:00:00",
  "telefone": "(11) 3456-7890",
  "celular": "(11) 98765-4321",
  "email": "joao.silva@email.com",
  "cep": "01234-567",
  "logradouro": "Rua das Flores",
  "numero": "123",
  "complemento": "Apto 45",
  "bairro": "Centro",
  "cidade": "São Paulo",
  "estado": "SP",
  "dataCadastro": "2024-01-15T10:30:00",
  "ativo": true
}
```

**Resposta (404 Not Found):**
```json
{
  "message": "Responsável financeiro não encontrado"
}
```

### 3. Criar responsável financeiro

**Endpoint:** `POST /api/responsaveisfinanceiros`

```bash
curl -X POST "https://localhost:7000/api/responsaveisfinanceiros" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "nome": "Maria Oliveira",
    "cpf": "987.654.321-00",
    "rg": "98.765.432-1",
    "dataNascimento": "1985-08-20",
    "telefone": "(11) 3333-4444",
    "celular": "(11) 99999-8888",
    "email": "maria.oliveira@email.com",
    "cep": "12345-678",
    "logradouro": "Av. Paulista",
    "numero": "1000",
    "complemento": "Sala 200",
    "bairro": "Bela Vista",
    "cidade": "São Paulo",
    "estado": "SP"
  }'
```

**Resposta (201 Created):**
```json
{
  "idResponsavel": 2,
  "nome": "Maria Oliveira",
  "cpf": "987.654.321-00",
  "rg": "98.765.432-1",
  "dataNascimento": "1985-08-20T00:00:00",
  "telefone": "(11) 3333-4444",
  "celular": "(11) 99999-8888",
  "email": "maria.oliveira@email.com",
  "cep": "12345-678",
  "logradouro": "Av. Paulista",
  "numero": "1000",
  "complemento": "Sala 200",
  "bairro": "Bela Vista",
  "cidade": "São Paulo",
  "estado": "SP",
  "dataCadastro": "2024-01-20T14:25:00",
  "ativo": true
}
```

**Resposta (400 Bad Request):**
```json
{
  "message": "CPF já cadastrado"
}
```

### 4. Atualizar responsável financeiro

**Endpoint:** `PUT /api/responsaveisfinanceiros/{id}`

```bash
curl -X PUT "https://localhost:7000/api/responsaveisfinanceiros/1" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "nome": "João da Silva Santos",
    "cpf": "123.456.789-00",
    "rg": "12.345.678-9",
    "dataNascimento": "1980-05-15",
    "telefone": "(11) 3456-7890",
  "celular": "(11) 98765-4321",
    "email": "joao.silva.santos@email.com",
    "cep": "01234-567",
    "logradouro": "Rua das Flores",
    "numero": "123",
 "complemento": "Apto 45",
    "bairro": "Centro",
    "cidade": "São Paulo",
    "estado": "SP"
  }'
```

**Resposta (204 No Content):** Sem corpo de resposta

**Resposta (400 Bad Request):**
```json
{
  "message": "Responsável não encontrado"
}
```

### 5. Excluir responsável financeiro

**Endpoint:** `DELETE /api/responsaveisfinanceiros/{id}`

```bash
curl -X DELETE "https://localhost:7000/api/responsaveisfinanceiros/1" \
  -H "Accept: application/json"
```

**Resposta (204 No Content):** Sem corpo de resposta

**Resposta (400 Bad Request):**
```json
{
  "message": "Não é possível excluir responsável com alunos vinculados"
}
```

---

## 👦👧 Alunos

### 1. Listar todos os alunos

**Endpoint:** `GET /api/alunos`

```bash
curl -X GET "https://localhost:7000/api/alunos" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
    "idAluno": 1,
    "nome": "Pedro Silva",
    "cpf": "111.222.333-44",
    "dataNascimento": "2010-03-10T00:00:00",
 "idade": 14,
    "sexo": "M",
    "telefone": "(11) 98888-7777",
    "email": "pedro.silva@email.com",
    "idResponsavelFinanceiro": 1,
    "nomeResponsavel": "João da Silva",
    "necessidadesEspeciais": null,
    "dataCadastro": "2024-01-15T10:30:00",
    "ativo": true
  }
]
```

### 2. Buscar aluno por ID

**Endpoint:** `GET /api/alunos/{id}`

```bash
curl -X GET "https://localhost:7000/api/alunos/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
{
  "idAluno": 1,
  "nome": "Pedro Silva",
  "cpf": "111.222.333-44",
  "dataNascimento": "2010-03-10T00:00:00",
  "idade": 14,
  "sexo": "M",
  "telefone": "(11) 98888-7777",
  "email": "pedro.silva@email.com",
  "idResponsavelFinanceiro": 1,
  "nomeResponsavel": "João da Silva",
  "necessidadesEspeciais": null,
  "dataCadastro": "2024-01-15T10:30:00",
  "ativo": true
}
```

**Resposta (404 Not Found):**
```json
{
  "message": "Aluno não encontrado"
}
```

### 3. Listar alunos por responsável

**Endpoint:** `GET /api/alunos/responsavel/{idResponsavel}`

```bash
curl -X GET "https://localhost:7000/api/alunos/responsavel/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
    "idAluno": 1,
    "nome": "Pedro Silva",
    "cpf": "111.222.333-44",
    "dataNascimento": "2010-03-10T00:00:00",
    "idade": 14,
    "sexo": "M",
    "telefone": "(11) 98888-7777",
    "email": "pedro.silva@email.com",
    "idResponsavelFinanceiro": 1,
    "nomeResponsavel": "João da Silva",
    "necessidadesEspeciais": null,
    "dataCadastro": "2024-01-15T10:30:00",
    "ativo": true
  },
  {
    "idAluno": 2,
    "nome": "Ana Silva",
    "cpf": "222.333.444-55",
    "dataNascimento": "2012-07-25T00:00:00",
    "idade": 12,
    "sexo": "F",
    "telefone": "(11) 98888-7777",
    "email": "ana.silva@email.com",
    "idResponsavelFinanceiro": 1,
    "nomeResponsavel": "João da Silva",
    "necessidadesEspeciais": null,
    "dataCadastro": "2024-01-15T10:35:00",
    "ativo": true
  }
]
```

### 4. Criar aluno

**Endpoint:** `POST /api/alunos`

```bash
curl -X POST "https://localhost:7000/api/alunos" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "nome": "Carlos Oliveira",
    "cpf": "333.444.555-66",
  "rg": "33.444.555-6",
    "dataNascimento": "2011-11-15",
    "sexo": "M",
    "telefone": "(11) 97777-6666",
    "email": "carlos.oliveira@email.com",
    "idResponsavelFinanceiro": 2,
 "cep": "12345-678",
    "logradouro": "Av. Paulista",
    "numero": "1000",
    "complemento": "Sala 200",
    "bairro": "Bela Vista",
    "cidade": "São Paulo",
    "estado": "SP",
    "necessidadesEspeciais": null,
    "observacoes": "Aluno transferido"
  }'
```

**Resposta (201 Created):**
```json
{
  "idAluno": 3,
  "nome": "Carlos Oliveira",
  "cpf": "333.444.555-66",
  "dataNascimento": "2011-11-15T00:00:00",
  "idade": 13,
  "sexo": "M",
  "telefone": "(11) 97777-6666",
  "email": "carlos.oliveira@email.com",
  "idResponsavelFinanceiro": 2,
  "nomeResponsavel": "Maria Oliveira",
  "necessidadesEspeciais": null,
  "dataCadastro": "2024-01-20T15:00:00",
  "ativo": true
}
```

**Resposta (400 Bad Request):**
```json
{
  "message": "Responsável financeiro não encontrado"
}
```

### 5. Atualizar aluno

**Endpoint:** `PUT /api/alunos/{id}`

```bash
curl -X PUT "https://localhost:7000/api/alunos/1" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "nome": "Pedro Silva Santos",
  "cpf": "111.222.333-44",
  "rg": "11.222.333-4",
    "dataNascimento": "2010-03-10",
    "sexo": "M",
    "telefone": "(11) 98888-7777",
    "email": "pedro.silva.santos@email.com",
    "idResponsavelFinanceiro": 1,
    "cep": "01234-567",
    "logradouro": "Rua das Flores",
    "numero": "123",
    "complemento": "Apto 45",
    "bairro": "Centro",
    "cidade": "São Paulo",
  "estado": "SP",
    "necessidadesEspeciais": null,
    "observacoes": "Atualizado telefone"
  }'
```

**Resposta (204 No Content):** Sem corpo de resposta

### 6. Excluir aluno

**Endpoint:** `DELETE /api/alunos/{id}`

```bash
curl -X DELETE "https://localhost:7000/api/alunos/1" \
  -H "Accept: application/json"
```

**Resposta (204 No Content):** Sem corpo de resposta

**Resposta (400 Bad Request):**
```json
{
  "message": "Não é possível excluir aluno com matrículas ativas"
}
```

---

## 🏫 Turmas

### 1. Listar todas as turmas

**Endpoint:** `GET /api/turmas`

```bash
curl -X GET "https://localhost:7000/api/turmas" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
    "idTurma": 1,
    "nome": "9º Ano A",
    "anoLetivo": 2024,
    "serie": "9º Ano",
    "turno": "Manhã",
    "sala": "Sala 101",
    "capacidadeMaxima": 35,
    "vagasDisponiveis": 30,
    "dataInicio": "2024-02-01T00:00:00",
    "dataFim": "2024-12-20T00:00:00",
    "ativo": true
  }
]
```

### 2. Buscar turma por ID

**Endpoint:** `GET /api/turmas/{id}`

```bash
curl -X GET "https://localhost:7000/api/turmas/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
{
  "idTurma": 1,
  "nome": "9º Ano A",
  "anoLetivo": 2024,
  "serie": "9º Ano",
  "turno": "Manhã",
  "sala": "Sala 101",
  "capacidadeMaxima": 35,
  "vagasDisponiveis": 30,
  "dataInicio": "2024-02-01T00:00:00",
  "dataFim": "2024-12-20T00:00:00",
  "ativo": true
}
```

**Resposta (404 Not Found):**
```json
{
  "message": "Turma não encontrada"
}
```

### 3. Listar turmas por ano letivo

**Endpoint:** `GET /api/turmas/ano/{ano}`

```bash
curl -X GET "https://localhost:7000/api/turmas/ano/2024" \
-H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
    "idTurma": 1,
    "nome": "9º Ano A",
    "anoLetivo": 2024,
    "serie": "9º Ano",
    "turno": "Manhã",
    "sala": "Sala 101",
    "capacidadeMaxima": 35,
    "vagasDisponiveis": 30,
    "dataInicio": "2024-02-01T00:00:00",
    "dataFim": "2024-12-20T00:00:00",
  "ativo": true
  },
  {
    "idTurma": 2,
    "nome": "9º Ano B",
    "anoLetivo": 2024,
    "serie": "9º Ano",
    "turno": "Tarde",
"sala": "Sala 102",
    "capacidadeMaxima": 35,
    "vagasDisponiveis": 32,
    "dataInicio": "2024-02-01T00:00:00",
    "dataFim": "2024-12-20T00:00:00",
    "ativo": true
  }
]
```

### 4. Criar turma

**Endpoint:** `POST /api/turmas`

```bash
curl -X POST "https://localhost:7000/api/turmas" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "nome": "8º Ano A",
"anoLetivo": 2024,
    "serie": "8º Ano",
  "turno": "Manhã",
    "sala": "Sala 201",
    "capacidadeMaxima": 30,
    "dataInicio": "2024-02-01",
    "dataFim": "2024-12-20"
  }'
```

**Resposta (201 Created):**
```json
{
  "idTurma": 3,
  "nome": "8º Ano A",
  "anoLetivo": 2024,
  "serie": "8º Ano",
  "turno": "Manhã",
  "sala": "Sala 201",
  "capacidadeMaxima": 30,
  "vagasDisponiveis": 30,
  "dataInicio": "2024-02-01T00:00:00",
  "dataFim": "2024-12-20T00:00:00",
  "ativo": true
}
```

**Resposta (400 Bad Request):**
```json
{
  "message": "Já existe uma turma com este nome no ano letivo"
}
```

### 5. Atualizar turma

**Endpoint:** `PUT /api/turmas/{id}`

```bash
curl -X PUT "https://localhost:7000/api/turmas/1" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "nome": "9º Ano A",
    "anoLetivo": 2024,
    "serie": "9º Ano",
    "turno": "Manhã",
    "sala": "Sala 105",
    "capacidadeMaxima": 40,
    "dataInicio": "2024-02-01",
    "dataFim": "2024-12-20"
  }'
```

**Resposta (204 No Content):** Sem corpo de resposta

### 6. Excluir turma

**Endpoint:** `DELETE /api/turmas/{id}`

```bash
curl -X DELETE "https://localhost:7000/api/turmas/1" \
  -H "Accept: application/json"
```

**Resposta (204 No Content):** Sem corpo de resposta

**Resposta (400 Bad Request):**
```json
{
  "message": "Não é possível excluir turma com matrículas ativas"
}
```

---

## 📝 Matrículas

### 1. Listar todas as matrículas

**Endpoint:** `GET /api/matriculas`

```bash
curl -X GET "https://localhost:7000/api/matriculas" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
    "idMatricula": 1,
"idAluno": 1,
    "nomeAluno": "Pedro Silva",
    "idTurma": 1,
    "nomeTurma": "9º Ano A",
    "dataMatricula": "2024-01-20T00:00:00",
    "numeroMatricula": "2024001",
    "situacao": "Ativa",
    "valorMensalidade": 850.00,
"diaVencimento": 10,
    "observacoes": null,
    "dataCadastro": "2024-01-20T10:00:00"
  }
]
```

### 2. Buscar matrícula por ID

**Endpoint:** `GET /api/matriculas/{id}`

```bash
curl -X GET "https://localhost:7000/api/matriculas/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
{
  "idMatricula": 1,
  "idAluno": 1,
  "nomeAluno": "Pedro Silva",
  "idTurma": 1,
  "nomeTurma": "9º Ano A",
  "dataMatricula": "2024-01-20T00:00:00",
  "numeroMatricula": "2024001",
  "situacao": "Ativa",
  "valorMensalidade": 850.00,
  "diaVencimento": 10,
  "observacoes": null,
  "dataCadastro": "2024-01-20T10:00:00"
}
```

**Resposta (404 Not Found):**
```json
{
  "message": "Matrícula não encontrada"
}
```

### 3. Listar matrículas por aluno

**Endpoint:** `GET /api/matriculas/aluno/{idAluno}`

```bash
curl -X GET "https://localhost:7000/api/matriculas/aluno/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
    "idMatricula": 1,
    "idAluno": 1,
    "nomeAluno": "Pedro Silva",
  "idTurma": 1,
  "nomeTurma": "9º Ano A",
    "dataMatricula": "2024-01-20T00:00:00",
    "numeroMatricula": "2024001",
    "situacao": "Ativa",
    "valorMensalidade": 850.00,
    "diaVencimento": 10,
    "observacoes": null,
    "dataCadastro": "2024-01-20T10:00:00"
  }
]
```

### 4. Criar matrícula

**Endpoint:** `POST /api/matriculas`

```bash
curl -X POST "https://localhost:7000/api/matriculas" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "idAluno": 2,
    "idTurma": 1,
    "dataMatricula": "2024-01-21",
    "numeroMatricula": "2024002",
    "valorMensalidade": 850.00,
    "diaVencimento": 10,
    "observacoes": "Primeira matrícula"
  }'
```

**Resposta (201 Created):**
```json
{
  "idMatricula": 2,
  "idAluno": 2,
  "nomeAluno": "Ana Silva",
  "idTurma": 1,
  "nomeTurma": "9º Ano A",
  "dataMatricula": "2024-01-21T00:00:00",
  "numeroMatricula": "2024002",
  "situacao": "Ativa",
  "valorMensalidade": 850.00,
  "diaVencimento": 10,
  "observacoes": "Primeira matrícula",
  "dataCadastro": "2024-01-21T11:00:00"
}
```

**Resposta (400 Bad Request):**
```json
{
  "message": "Aluno já possui matrícula ativa nesta turma"
}
```

### 5. Atualizar matrícula

**Endpoint:** `PUT /api/matriculas/{id}`

```bash
curl -X PUT "https://localhost:7000/api/matriculas/1" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "numeroMatricula": "2024001",
    "valorMensalidade": 900.00,
    "diaVencimento": 15,
    "observacoes": "Valor atualizado"
  }'
```

**Resposta (204 No Content):** Sem corpo de resposta

### 6. Cancelar matrícula

**Endpoint:** `PATCH /api/matriculas/{id}/cancelar`

```bash
curl -X PATCH "https://localhost:7000/api/matriculas/1/cancelar" \
  -H "Accept: application/json"
```

**Resposta (204 No Content):** Sem corpo de resposta

**Resposta (400 Bad Request):**
```json
{
  "message": "Matrícula já está cancelada"
}
```

---

## 📚 Disciplinas

### 1. Listar todas as disciplinas

**Endpoint:** `GET /api/disciplinas`

```bash
curl -X GET "https://localhost:7000/api/disciplinas" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
  "idDisciplina": 1,
    "nome": "Matemática",
    "codigo": "MAT001",
    "cargaHoraria": 80,
"descricao": "Disciplina de Matemática do Ensino Fundamental II",
    "ativo": true
  },
  {
    "idDisciplina": 2,
    "nome": "Português",
    "codigo": "POR001",
    "cargaHoraria": 80,
    "descricao": "Disciplina de Língua Portuguesa",
    "ativo": true
  }
]
```

### 2. Listar disciplinas ativas

**Endpoint:** `GET /api/disciplinas/ativas`

```bash
curl -X GET "https://localhost:7000/api/disciplinas/ativas" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
    "idDisciplina": 1,
    "nome": "Matemática",
    "codigo": "MAT001",
    "cargaHoraria": 80,
    "descricao": "Disciplina de Matemática do Ensino Fundamental II",
    "ativo": true
  }
]
```

### 3. Buscar disciplina por ID

**Endpoint:** `GET /api/disciplinas/{id}`

```bash
curl -X GET "https://localhost:7000/api/disciplinas/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
{
  "idDisciplina": 1,
  "nome": "Matemática",
  "codigo": "MAT001",
  "cargaHoraria": 80,
  "descricao": "Disciplina de Matemática do Ensino Fundamental II",
  "ativo": true
}
```

**Resposta (404 Not Found):**
```json
{
  "message": "Disciplina com ID 1 não encontrada."
}
```

### 4. Criar disciplina

**Endpoint:** `POST /api/disciplinas`

```bash
curl -X POST "https://localhost:7000/api/disciplinas" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "nome": "História",
  "codigo": "HIS001",
    "cargaHoraria": 60,
    "descricao": "Disciplina de História do Brasil e Geral"
  }'
```

**Resposta (201 Created):**
```json
{
  "idDisciplina": 3,
  "nome": "História",
  "codigo": "HIS001",
  "cargaHoraria": 60,
  "descricao": "Disciplina de História do Brasil e Geral",
  "ativo": true
}
```

**Resposta (400 Bad Request):**
```json
{
  "message": "Já existe uma disciplina com este código"
}
```

### 5. Atualizar disciplina

**Endpoint:** `PUT /api/disciplinas/{id}`

```bash
curl -X PUT "https://localhost:7000/api/disciplinas/1" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "nome": "Matemática Avançada",
    "codigo": "MAT001",
    "cargaHoraria": 100,
    "descricao": "Disciplina de Matemática do Ensino Fundamental II - Nível Avançado"
  }'
```

**Resposta (204 No Content):** Sem corpo de resposta

**Resposta (404 Not Found):**
```json
{
  "message": "Disciplina não encontrada"
}
```

### 6. Excluir disciplina

**Endpoint:** `DELETE /api/disciplinas/{id}`

```bash
curl -X DELETE "https://localhost:7000/api/disciplinas/1" \
  -H "Accept: application/json"
```

**Resposta (204 No Content):** Sem corpo de resposta

**Resposta (400 Bad Request):**
```json
{
  "message": "Não é possível excluir disciplina vinculada a turmas"
}
```

---

## 🔗 Turmas-Disciplinas

### 1. Vincular disciplina a uma turma

**Endpoint:** `POST /api/turmas-disciplinas`

```bash
curl -X POST "https://localhost:7000/api/turmas-disciplinas" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
  "idTurma": 1,
 "idDisciplina": 1,
  "professorNome": "Prof. Carlos Alberto"
  }'
```

**Resposta (201 Created):**
```json
{
  "idTurmaDisciplina": 1,
  "idTurma": 1,
  "idDisciplina": 1,
  "professorNome": "Prof. Carlos Alberto"
}
```

**Resposta (400 Bad Request):**
```json
{
  "message": "Esta disciplina já está vinculada a esta turma"
}
```

### 2. Listar disciplinas de uma turma

**Endpoint:** `GET /api/turmas-disciplinas/turma/{idTurma}`

```bash
curl -X GET "https://localhost:7000/api/turmas-disciplinas/turma/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
    "idTurmaDisciplina": 1,
    "idTurma": 1,
    "nomeTurma": "9º Ano A",
    "serie": "9º Ano",
    "anoLetivo": 2024,
    "idDisciplina": 1,
    "nomeDisciplina": "Matemática",
    "codigoDisciplina": "MAT001",
    "cargaHoraria": 80,
    "professorNome": "Prof. Carlos Alberto"
  },
  {
    "idTurmaDisciplina": 2,
    "idTurma": 1,
    "nomeTurma": "9º Ano A",
    "serie": "9º Ano",
    "anoLetivo": 2024,
  "idDisciplina": 2,
    "nomeDisciplina": "Português",
    "codigoDisciplina": "POR001",
    "cargaHoraria": 80,
    "professorNome": "Prof. Maria Helena"
  }
]
```

### 3. Listar turmas de uma disciplina

**Endpoint:** `GET /api/turmas-disciplinas/disciplina/{idDisciplina}`

```bash
curl -X GET "https://localhost:7000/api/turmas-disciplinas/disciplina/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
    "idTurmaDisciplina": 1,
    "idTurma": 1,
    "nomeTurma": "9º Ano A",
    "serie": "9º Ano",
    "anoLetivo": 2024,
    "idDisciplina": 1,
    "nomeDisciplina": "Matemática",
    "codigoDisciplina": "MAT001",
    "cargaHoraria": 80,
    "professorNome": "Prof. Carlos Alberto"
  },
  {
    "idTurmaDisciplina": 3,
    "idTurma": 2,
    "nomeTurma": "9º Ano B",
    "serie": "9º Ano",
  "anoLetivo": 2024,
    "idDisciplina": 1,
    "nomeDisciplina": "Matemática",
    "codigoDisciplina": "MAT001",
  "cargaHoraria": 80,
    "professorNome": "Prof. Carlos Alberto"
  }
]
```

### 4. Atualizar professor de uma disciplina

**Endpoint:** `PATCH /api/turmas-disciplinas/{id}/professor`

```bash
curl -X PATCH "https://localhost:7000/api/turmas-disciplinas/1/professor" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "professorNome": "Prof. Roberto Silva"
}'
```

**Resposta (204 No Content):** Sem corpo de resposta

**Resposta (404 Not Found):**
```json
{
  "message": "Vínculo turma-disciplina não encontrado"
}
```

### 5. Desvincular disciplina de uma turma

**Endpoint:** `DELETE /api/turmas-disciplinas/{id}`

```bash
curl -X DELETE "https://localhost:7000/api/turmas-disciplinas/1" \
  -H "Accept: application/json"
```

**Resposta (204 No Content):** Sem corpo de resposta

**Resposta (404 Not Found):**
```json
{
  "message": "Vínculo turma-disciplina não encontrado"
}
```

---

## 📊 Notas

### 1. Listar todas as notas

**Endpoint:** `GET /api/notas`

```bash
curl -X GET "https://localhost:7000/api/notas" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
    "idNota": 1,
    "idMatricula": 1,
    "idDisciplina": 1,
    "tipoAvaliacao": "Prova",
    "bimestre": 1,
    "notaValor": 8.5,
    "peso": 3.0,
    "dataAvaliacao": "2024-03-15T00:00:00",
    "dataLancamento": "2024-03-20T10:30:00"
  }
]
```

### 2. Buscar nota por ID

**Endpoint:** `GET /api/notas/{id}`

```bash
curl -X GET "https://localhost:7000/api/notas/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
{
  "idNota": 1,
  "idMatricula": 1,
"numeroMatricula": "2024001",
  "nomeAluno": "Pedro Silva",
  "idDisciplina": 1,
  "nomeDisciplina": "Matemática",
  "tipoAvaliacao": "Prova",
  "bimestre": 1,
  "notaValor": 8.5,
  "peso": 3.0,
  "dataAvaliacao": "2024-03-15T00:00:00",
  "observacoes": null,
  "dataLancamento": "2024-03-20T10:30:00"
}
```

**Resposta (404 Not Found):**
```json
{
  "message": "Nota com ID 1 não encontrada."
}
```

### 3. Listar notas de uma matrícula

**Endpoint:** `GET /api/notas/matricula/{idMatricula}`

```bash
curl -X GET "https://localhost:7000/api/notas/matricula/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
    "idNota": 1,
    "idMatricula": 1,
    "numeroMatricula": "2024001",
    "nomeAluno": "Pedro Silva",
    "idDisciplina": 1,
    "nomeDisciplina": "Matemática",
    "tipoAvaliacao": "Prova",
    "bimestre": 1,
  "notaValor": 8.5,
    "peso": 3.0,
    "dataAvaliacao": "2024-03-15T00:00:00",
    "observacoes": null,
    "dataLancamento": "2024-03-20T10:30:00"
  },
  {
    "idNota": 2,
    "idMatricula": 1,
    "numeroMatricula": "2024001",
    "nomeAluno": "Pedro Silva",
    "idDisciplina": 1,
    "nomeDisciplina": "Matemática",
    "tipoAvaliacao": "Trabalho",
    "bimestre": 1,
    "notaValor": 9.0,
    "peso": 2.0,
    "dataAvaliacao": "2024-03-20T00:00:00",
    "observacoes": null,
    "dataLancamento": "2024-03-22T14:00:00"
  }
]
```

### 4. Listar notas por matrícula e disciplina

**Endpoint:** `GET /api/notas/matricula/{idMatricula}/disciplina/{idDisciplina}`

```bash
curl -X GET "https://localhost:7000/api/notas/matricula/1/disciplina/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
    "idNota": 1,
    "idMatricula": 1,
    "numeroMatricula": "2024001",
    "nomeAluno": "Pedro Silva",
    "idDisciplina": 1,
    "nomeDisciplina": "Matemática",
    "tipoAvaliacao": "Prova",
    "bimestre": 1,
    "notaValor": 8.5,
    "peso": 3.0,
    "dataAvaliacao": "2024-03-15T00:00:00",
    "observacoes": null,
    "dataLancamento": "2024-03-20T10:30:00"
  }
]
```

### 5. Listar notas por bimestre

**Endpoint:** `GET /api/notas/bimestre/{bimestre}`

```bash
curl -X GET "https://localhost:7000/api/notas/bimestre/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
[
  {
    "idNota": 1,
    "idMatricula": 1,
    "idDisciplina": 1,
    "tipoAvaliacao": "Prova",
  "bimestre": 1,
    "notaValor": 8.5,
    "peso": 3.0,
    "dataAvaliacao": "2024-03-15T00:00:00",
    "dataLancamento": "2024-03-20T10:30:00"
  }
]
```

**Resposta (400 Bad Request):**
```json
{
  "message": "Bimestre deve estar entre 1 e 4."
}
```

### 6. Obter boletim completo do aluno

**Endpoint:** `GET /api/notas/boletim/{idMatricula}`

```bash
curl -X GET "https://localhost:7000/api/notas/boletim/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
{
  "idMatricula": 1,
  "numeroMatricula": "2024001",
  "nomeAluno": "Pedro Silva",
  "nomeTurma": "9º Ano A",
  "disciplinas": [
    {
      "idDisciplina": 1,
      "nomeDisciplina": "Matemática",
      "notasPorBimestre": {
        "1": [
   {
       "idNota": 1,
            "tipoAvaliacao": "Prova",
      "notaValor": 8.5,
   "peso": 3.0,
            "dataAvaliacao": "2024-03-15T00:00:00"
          },
          {
            "idNota": 2,
        "tipoAvaliacao": "Trabalho",
       "notaValor": 9.0,
      "peso": 2.0,
            "dataAvaliacao": "2024-03-20T00:00:00"
          }
        ],
        "2": [
          {
        "idNota": 5,
            "tipoAvaliacao": "Prova",
            "notaValor": 7.5,
   "peso": 3.0,
            "dataAvaliacao": "2024-05-10T00:00:00"
          }
   ]
      },
      "mediasPorBimestre": {
     "1": 8.7,
 "2": 7.5,
        "3": null,
        "4": null
      },
      "mediaFinal": 8.1
    },
 {
      "idDisciplina": 2,
    "nomeDisciplina": "Português",
      "notasPorBimestre": {
        "1": [
      {
    "idNota": 3,
            "tipoAvaliacao": "Prova",
  "notaValor": 9.0,
    "peso": 3.0,
        "dataAvaliacao": "2024-03-18T00:00:00"
 }
        ]
      },
      "mediasPorBimestre": {
        "1": 9.0,
   "2": null,
      "3": null,
    "4": null
      },
    "mediaFinal": 9.0
    }
  ]
}
```

**Resposta (404 Not Found):**
```json
{
  "message": "Matrícula não encontrada"
}
```

### 7. Calcular média de um bimestre

**Endpoint:** `GET /api/notas/media/matricula/{idMatricula}/disciplina/{idDisciplina}/bimestre/{bimestre}`

```bash
curl -X GET "https://localhost:7000/api/notas/media/matricula/1/disciplina/1/bimestre/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
{
  "idMatricula": 1,
  "idDisciplina": 1,
  "bimestre": 1,
  "media": 8.7,
  "totalNotas": 2
}
```

**Resposta (400 Bad Request):**
```json
{
  "message": "Bimestre deve estar entre 1 e 4."
}
```

### 8. Calcular média final de uma disciplina

**Endpoint:** `GET /api/notas/media-final/matricula/{idMatricula}/disciplina/{idDisciplina}`

```bash
curl -X GET "https://localhost:7000/api/notas/media-final/matricula/1/disciplina/1" \
  -H "Accept: application/json"
```

**Resposta (200 OK):**
```json
{
  "idMatricula": 1,
  "idDisciplina": 1,
  "mediaFinal": 8.1
}
```

### 9. Criar nota

**Endpoint:** `POST /api/notas`

```bash
curl -X POST "https://localhost:7000/api/notas" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
    "idMatricula": 1,
    "idDisciplina": 1,
    "tipoAvaliacao": "Prova",
    "bimestre": 2,
"notaValor": 7.5,
    "peso": 3.0,
    "dataAvaliacao": "2024-05-10",
    "observacoes": "Prova do 2º bimestre"
  }'
```

**Resposta (201 Created):**
```json
{
  "idNota": 6,
  "idMatricula": 1,
  "idDisciplina": 1,
  "tipoAvaliacao": "Prova",
  "bimestre": 2,
  "notaValor": 7.5,
  "peso": 3.0,
  "dataAvaliacao": "2024-05-10T00:00:00",
  "dataLancamento": "2024-05-12T09:15:00"
}
```

**Resposta (400 Bad Request):**
```json
{
  "message": "Matrícula não encontrada"
}
```

### 10. Atualizar nota

**Endpoint:** `PUT /api/notas/{id}`

```bash
curl -X PUT "https://localhost:7000/api/notas/1" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{
 "tipoAvaliacao": "Prova",
    "bimestre": 1,
 "notaValor": 9.0,
    "peso": 3.0,
    "dataAvaliacao": "2024-03-15",
    "observacoes": "Nota revisada"
  }'
```

**Resposta (204 No Content):** Sem corpo de resposta

**Resposta (404 Not Found):**
```json
{
  "message": "Nota não encontrada"
}
```

### 11. Excluir nota

**Endpoint:** `DELETE /api/notas/{id}`

```bash
curl -X DELETE "https://localhost:7000/api/notas/1" \
  -H "Accept: application/json"
```

**Resposta (204 No Content):** Sem corpo de resposta

**Resposta (404 Not Found):**
```json
{
  "message": "Nota não encontrada"
}
```

---

## 📌 Notas Importantes

### Códigos de Status HTTP

- **200 OK**: Requisição bem-sucedida com retorno de dados
- **201 Created**: Recurso criado com sucesso
- **204 No Content**: Operação bem-sucedida sem retorno de dados
- **400 Bad Request**: Erro na validação dos dados enviados
- **404 Not Found**: Recurso não encontrado
- **500 Internal Server Error**: Erro interno do servidor

### Validações Comuns

#### Responsáveis Financeiros
- CPF deve ser único
- Nome, CPF e Telefone são obrigatórios
- Email deve ter formato válido

#### Alunos
- Nome, Data de Nascimento, Sexo e ID do Responsável são obrigatórios
- Sexo deve ser M, F ou O
- CPF deve ser único (se informado)
- Responsável financeiro deve existir

#### Turmas
- Nome, Ano Letivo, Série e Turno são obrigatórios
- Ano letivo deve estar entre 2000 e 2100
- Capacidade máxima entre 1 e 100
- Não pode haver turmas duplicadas no mesmo ano letivo

#### Matrículas
- Aluno e Turma são obrigatórios
- Número de matrícula deve ser único
- Aluno não pode ter múltiplas matrículas ativas na mesma turma
- Dia de vencimento deve estar entre 1 e 31

#### Disciplinas
- Nome é obrigatório
- Código deve ser único (se informado)
- Carga horária entre 1 e 500 horas

#### Notas
- Matrícula, Disciplina e Tipo de Avaliação são obrigatórios
- Bimestre deve estar entre 1 e 4
- Nota deve estar entre 0 e 10
- Peso deve ser maior que 0

### Dicas para Frontend

1. **Autenticação**: Esta API não possui autenticação implementada. Adicione conforme necessário.

2. **Paginação**: As listagens não possuem paginação. Considere implementar no backend se necessário.

3. **Filtros**: Utilize os endpoints específicos (ex: por responsável, por ano letivo) para filtrar dados.

4. **Cascata**: Ao excluir recursos, verifique se há relacionamentos (ex: não é possível excluir responsável com alunos).

5. **Validação de Formulários**: Implemente validações no frontend baseadas nas constraints dos DTOs.

6. **Tratamento de Erros**: Sempre verifique os códigos de status e exiba mensagens apropriadas ao usuário.

7. **Datas**: As datas são retornadas no formato ISO 8601. Formate conforme necessário no frontend.

8. **Valores Monetários**: Valores de mensalidade são do tipo decimal. Formate adequadamente para exibição.

---

## 🔧 Testando a API

### Usando cURL

Todos os exemplos acima podem ser executados diretamente no terminal. Certifique-se de:

1. Substituir `https://localhost:7000` pela URL correta da sua API
2. Ajustar IDs conforme os dados existentes no seu banco
3. Verificar se a API está rodando antes de executar os comandos

### Usando Swagger

A API possui documentação Swagger disponível em:
- **Development**: `https://localhost:7000/swagger`

### Usando Postman

Importe os cURL acima no Postman para criar uma coleção completa de testes.

### Ordem Recomendada para Testes

1. Criar Responsável Financeiro
2. Criar Aluno (vinculado ao responsável)
3. Criar Turma
4. Criar Disciplina
5. Vincular Disciplina à Turma
6. Criar Matrícula (aluno + turma)
7. Lançar Notas
8. Consultar Boletim

---

**Última atualização:** Janeiro 2024  
**Versão da API:** 1.0
