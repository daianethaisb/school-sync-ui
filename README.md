# SchoolSync UI - Sistema de Gerenciamento Escolar

Sistema web desenvolvido em Angular 18 para gerenciamento completo de escolas, incluindo controle de alunos, turmas, disciplinas, matrículas e notas.

## 🚀 Tecnologias Utilizadas

- **Angular 18** (Standalone Components)
- **TypeScript**
- **Bootstrap 5** (UI Framework)
- **Bootstrap Icons**
- **RxJS**
- **HttpClient** com Fetch API

## 📁 Estrutura do Projeto

```
src/app/
├── core/
│   ├── dtos/
│   │   ├── requests/       # DTOs para requisições à API
│   │   └── responses/      # DTOs para respostas da API
│   ├── enums/              # Enumerações do sistema
│   ├── models/             # Interfaces/Models
│   ├── services/           # Serviços de domínio e API
│   └── layout/             # Componentes de layout (Header, Sidebar, Footer)
├── pages/                  # Páginas da aplicação
│   ├── dashboard/
│   ├── alunos/
│   ├── responsaveis/
│   ├── turmas/
│   ├── disciplinas/
│   ├── matriculas/
│   └── notas/
└── shared/                 # Componentes, diretivas e validators compartilhados
    ├── components/
    ├── directives/
    └── validators/
```

## 📋 Funcionalidades Implementadas

### Páginas
- ✅ Dashboard com resumo do sistema
- ✅ Listagem de Alunos
- ✅ Formulário de Aluno (estrutura criada)
- ✅ Listagem de Responsáveis (estrutura criada)
- ✅ Listagem de Turmas (estrutura criada)
- ✅ Listagem de Disciplinas (estrutura criada)
- ✅ Listagem de Matrículas (estrutura criada)
- ✅ Listagem de Notas (estrutura criada)

### Core
- ✅ Serviços de comunicação com API
- ✅ Models/Interfaces
- ✅ DTOs de Request e Response
- ✅ Enums do sistema
- ✅ Tratamento de erros

## 🎨 Padrões Utilizados

### Angular 18
- Standalone Components (sem NgModules)
- Nova sintaxe de controle de fluxo (@if, @for, @else)
- Injeção de dependência com `inject()`
- Reactive approach com async/await
- FormBuilder para formulários reativos

### Organização de Código
- Padrão SOLID
- Nomenclatura em português para variáveis e funções
- PascalCase para classes, interfaces e enums
- camelCase para variáveis e funções
- Prefixo underscore (_) para propriedades privadas
- Código modular e reutilizável
- Organização de pastas seguindo as instruções do `.github/copilot-instructions.md`

**Desenvolvido com Angular 18 e Bootstrap 5**


# SchoolSync API - Arquitetura DDD da API (Backend)

A API foi desenvolvida seguindo rigorosamente os princípios do **Domain-Driven Design**, proporcionando:

#### 📦 Camadas Bem Definidas

```
SchoolSync.API/
├── Domain/              # Camada de Domínio (Núcleo)
│   ├── Entities/       # Entidades do domínio
│   ├── ValueObjects/   # Objetos de valor
│   ├── Enums/          # Enumerações
│   └── Interfaces/     # Contratos de repositórios
├── Application/         # Camada de Aplicação
│   ├── DTOs/           # Data Transfer Objects
│   ├── Services/       # Serviços de aplicação
│   └── Mappings/       # AutoMapper profiles
├── Infrastructure/      # Camada de Infraestrutura
│   ├── Data/           # Contexto EF Core
│   ├── Repositories/   # Implementação de repositórios
│   └── Migrations/     # Migrações de banco
└── API/                # Camada de Apresentação
    └── Controllers/    # Endpoints REST
```

#### 🎨 Benefícios da Arquitetura DDD

1. **Separação de Responsabilidades**
   - Cada camada tem um propósito claro e bem definido
   - Facilita manutenção e evolução do código
   - Permite testes unitários isolados

2. **Domain-Centric**
   - Lógica de negócio centralizada no domínio
   - Entidades ricas com comportamento
   - Validações no nível correto

3. **Independência de Framework**
   - Core do sistema independente de tecnologia
   - Facilita migração e atualização de frameworks
   - Testabilidade aprimorada

4. **Repository Pattern**
   - Abstração do acesso a dados
   - Facilita testes com mocks
   - Separação entre domínio e persistência

​💾 Banco de Dados em Memória (Entity Framework Core)

​Este projeto utiliza o Banco de Dados em Memória (In-Memory Database) do Entity Framework Core. Esta escolha técnica não visa a persistência de longo prazo, mas sim focar integralmente na arquitetura e no desenvolvimento rápido.
​Benefícios Principais:
​Desacoplamento Arquitetural (DDD): Permite validar a arquitetura em camadas (DDD), garantindo que a lógica de negócio seja independente de qualquer provedor de banco de dados real.
​Setup Rápido: Elimina a necessidade de instalação e configuração de um servidor SQL externo, acelerando o desenvolvimento e o teste inicial (sem connection strings ou migrations).
​Ambiente de Teste Limpo: Garante que a aplicação sempre inicie com um estado de dados limpo, ideal para testes de integração e demonstrações.

​Nota: Ao encerrar o servidor da API (dotnet run), todos os dados cadastrados são resetados, pois a persistência é apenas na memória RAM.


## 🔌 Integração com a API

A aplicação está configurada para se comunicar com a API RESTful do SchoolSync através dos seguintes serviços:

### Serviços Disponíveis

- **ApiRequestsService**: Serviço base para requisições HTTP
- **AlunoService**: Gerenciamento de alunos
- **ResponsavelFinanceiroService**: Gerenciamento de responsáveis financeiros
- **TurmaService**: Gerenciamento de turmas
- **DisciplinaService**: Gerenciamento de disciplinas
- **MatriculaService**: Gerenciamento de matrículas
- **NotaService**: Gerenciamento de notas
- **TurmaDisciplinaService**: Vínculo entre turmas e disciplinas

### Endpoints da API

Todos os serviços utilizam os endpoints documentados em `API-doc.md`:

- `/api/alunos` - Gerenciamento de alunos
- `/api/responsaveisfinanceiros` - Responsáveis financeiros
- `/api/turmas` - Turmas
- `/api/disciplinas` - Disciplinas
- `/api/matriculas` - Matrículas
- `/api/notas` - Notas
- `/api/turmas-disciplinas` - Vínculo turma-disciplina

## ⚙️ Configuração do projeto

### Pré-requisitos

- Node.js (v18 ou superior)
- Angular CLI (`npm install -g @angular/cli`)

### Instalação

1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd school-sync-ui
```

2. Instale as dependências
```bash
npm install
```

3. Configure a URL da API

Edite o arquivo `src/environments/environment.ts` e `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7144/api'  // Ajuste para a URL da sua API
};
```

### Executar a Aplicação

```bash
npm start
# ou
ng serve
```

A aplicação estará disponível em `http://localhost:4200`


## 📞 Suporte

Consulte:
- `API-doc.md` - Documentação completa da API
- `API-SERVICES.md` - Resumo das Conexões com a API
- `.github/copilot-instructions.md` - Padrões do projeto

---

**Sistema pronto para uso e expansão!** 🎉
