import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AlunoService } from '../../../core/services/aluno.service';
import { Aluno } from '../../../core/models';

@Component({
  selector: 'app-lista-alunos',
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-alunos.component.html',
  styleUrl: './lista-alunos.component.scss'
})
export class ListaAlunosComponent implements OnInit {
  private readonly _alunoService = inject(AlunoService);
  
  alunos: Aluno[] = [];
  carregando = false;
  erro: string | null = null;

  async ngOnInit() {
    await this.carregarAlunos();
  }

  async carregarAlunos() {
    try {
      this.carregando = true;
      this.erro = null;
      this.alunos = await this._alunoService.listarTodos();
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar alunos';
      console.error('Erro ao carregar alunos:', error);
    } finally {
      this.carregando = false;
    }
  }

  async excluirAluno(id: number) {
    if (!confirm('Deseja realmente excluir este aluno?')) {
      return;
    }

    try {
      await this._alunoService.excluir(id);
      await this.carregarAlunos();
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao excluir aluno';
      console.error('Erro ao excluir aluno:', error);
    }
  }
}
