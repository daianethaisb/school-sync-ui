import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'alunos',
    loadComponent: () => import('./pages/alunos/lista-alunos/lista-alunos.component').then(m => m.ListaAlunosComponent)
  },
  {
    path: 'alunos/novo',
    loadComponent: () => import('./pages/alunos/form-aluno/form-aluno.component').then(m => m.FormAlunoComponent)
  },
  {
    path: 'alunos/editar/:id',
    loadComponent: () => import('./pages/alunos/form-aluno/form-aluno.component').then(m => m.FormAlunoComponent)
  },
  {
    path: 'responsaveis',
    loadComponent: () => import('./pages/responsaveis/lista-responsaveis/lista-responsaveis.component').then(m => m.ListaResponsaveisComponent)
  },
  {
    path: 'responsaveis/novo',
    loadComponent: () => import('./pages/responsaveis/form-responsavel/form-responsavel.component').then(m => m.FormResponsavelComponent)
  },
  {
    path: 'responsaveis/:id',
    loadComponent: () => import('./pages/responsaveis/form-responsavel/form-responsavel.component').then(m => m.FormResponsavelComponent)
  },
  {
    path: 'turmas',
    loadComponent: () => import('./pages/turmas/lista-turmas/lista-turmas.component').then(m => m.ListaTurmasComponent)
  },
  {
    path: 'turmas/novo',
    loadComponent: () => import('./pages/turmas/form-turma/form-turma.component').then(m => m.FormTurmaComponent)
  },
  {
    path: 'turmas/editar/:id',
    loadComponent: () => import('./pages/turmas/form-turma/form-turma.component').then(m => m.FormTurmaComponent)
  },
  {
    path: 'disciplinas',
    loadComponent: () => import('./pages/disciplinas/lista-disciplinas/lista-disciplinas.component').then(m => m.ListaDisciplinasComponent)
  },
  {
    path: 'disciplinas/novo',
    loadComponent: () => import('./pages/disciplinas/form-disciplina/form-disciplina.component').then(m => m.FormDisciplinaComponent)
  },
  {
    path: 'disciplinas/editar/:id',
    loadComponent: () => import('./pages/disciplinas/form-disciplina/form-disciplina.component').then(m => m.FormDisciplinaComponent)
  },
  {
    path: 'matriculas',
    loadComponent: () => import('./pages/matriculas/lista-matriculas/lista-matriculas.component').then(m => m.ListaMatriculasComponent)
  },
  {
    path: 'matriculas/novo',
    loadComponent: () => import('./pages/matriculas/form-matricula/form-matricula.component').then(m => m.FormMatriculaComponent)
  },
  {
    path: 'matriculas/editar/:id',
    loadComponent: () => import('./pages/matriculas/form-matricula/form-matricula.component').then(m => m.FormMatriculaComponent)
  },
  {
    path: 'notas',
    loadComponent: () => import('./pages/notas/lista-notas/lista-notas.component').then(m => m.ListaNotasComponent)
  },
  {
    path: 'notas/novo',
    loadComponent: () => import('./pages/notas/form-nota/form-nota.component').then(m => m.FormNotaComponent)
  },
  {
    path: 'notas/editar/:id',
    loadComponent: () => import('./pages/notas/form-nota/form-nota.component').then(m => m.FormNotaComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

