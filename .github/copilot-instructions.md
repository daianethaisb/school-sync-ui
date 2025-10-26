### Estrutura/organização das pastas:
 
app/core:
    - dtos
        - requests:
        - responses:
    - enums:
    - models:
    - services:
    - layout: componentes de layout (header, footer, sidebar)
app/pages: criar um componente separado para cada página que tiver
app/shared:
    - components: componentes que serão compartilhados entre as páginas
    - directives
    - validators
 
### Instruções:
    - Os dtos de request e response serão utilizados principalmente no serviço api-requests.service.ts, que fará a comunicação com a API RESTful.
    - Use o enviroment para colocar as configurações de URL da API.
        - URL base API: https://localhost:7144/
    - Utilize Reactive Forms para os formulários.
    - Crie um sidebar para navegação entre as páginas.
    - Use bootstrap para estilização.
    - Crie os seguintes serviços na pasta core/services:
        - aluno.service.ts
        - turma.service.ts
        - disciplina.service.ts
        - nota.service.ts
        - responsavel-financeiro.service.ts
 
### Adicionais:
 
#### Padrões Angular
- Estou utilizando o angular 18;
- Estou utilizando standalone components, sem modulos;
- No html utilize sempre a nova sintaxe do Angular de diretivas: @if, @for, @switch, @else. Se houver alguma que não está nesse padrão, e sim no antigo, altere para o novo padrão;
- Priorize sempre o uso do bootstrap 5 no design, mas se não for possível, utilize o CSS puro;
- Utilize o padrão inject() do Angular para injeção de dependências, ao invés do construtor;
- Procure sempre componentizar o código, para evitar que o código fique muito grande e difícil de manter;
- Sempre utilize o firstValueFrom para requisições HTTP, com async/await, ao invés de subscribe;
- Priorize utilizar o formBuilder do Angular para criar formulários, ao invés de utilizar o template-driven forms;
 
#### Padrões de código
- Utilize o padrão SOLID;
- Mantenha o código limpo e organizado;
- Utilize o padrão de nomenclatura camelCase para variáveis e funções;
- Utilize o padrão PascalCase para classes, interfaces, enums e modelos;
- Mantenha o código modularizado e reutilizável;
- Evite duplicação de código;
- Use nomenclaturas em português para variáveis, funções, classes, interfaces, enums e modelos;
- Toda varivel private deve ser precedida por um underscore (_);
- Utilize o padrão de injeção de dependência do Angular;
- Mantenha o código simples e fácil de entender;
- Utilize nomes descritivos para variáveis, funções, classes, interfaces, etc.;
- Utilize o padrão de comentários do Angular, como // TODO: para tarefas pendentes, // FIXME: para correções, etc.;

