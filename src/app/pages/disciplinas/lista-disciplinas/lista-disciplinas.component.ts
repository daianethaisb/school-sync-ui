import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DisciplinaService } from '../../../core/services/disciplina.service';
import { Disciplina } from '../../../core/models';
import { ModalDisciplinaTurmasComponent } from '../../../shared/components/modal-disciplina-turmas/modal-disciplina-turmas.component';

@Component({
  selector: 'app-lista-disciplinas',
  imports: [CommonModule, RouterLink, ModalDisciplinaTurmasComponent],
  templateUrl: './lista-disciplinas.component.html',
  styleUrl: './lista-disciplinas.component.scss'
})
export class ListaDisciplinasComponent implements OnInit {
  private readonly _disciplinaService = inject(DisciplinaService);
  
  @ViewChild(ModalDisciplinaTurmasComponent) modalTurmas!: ModalDisciplinaTurmasComponent;
  
  disciplinas: Disciplina[] = [];
  carregando = false;
  erro: string | null = null;
  filtroAtivas = false;
  disciplinaSelecionada: Disciplina | null = null;

  async ngOnInit() {
    await this.carregarDisciplinas();
  }

  async carregarDisciplinas() {
    try {
      this.carregando = true;
      this.erro = null;
      
      if (this.filtroAtivas) {
        this.disciplinas = await this._disciplinaService.listarAtivas();
      } else {
        this.disciplinas = await this._disciplinaService.listarTodas();
      }
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar disciplinas';
      console.error('Erro ao carregar disciplinas:', error);
    } finally {
      this.carregando = false;
    }
  }

  async excluirDisciplina(id: number) {
    if (!confirm('Deseja realmente excluir esta disciplina?')) {
      return;
    }

    try {
      await this._disciplinaService.excluir(id);
      await this.carregarDisciplinas();
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao excluir disciplina';
      console.error('Erro ao excluir disciplina:', error);
    }
  }

  async toggleFiltroAtivas() {
    this.filtroAtivas = !this.filtroAtivas;
    await this.carregarDisciplinas();
  }

  abrirModalTurmas(disciplina: Disciplina) {
    this.disciplinaSelecionada = disciplina;
    // Aguarda um ciclo de detecção de mudanças antes de abrir o modal
    setTimeout(() => {
      if (this.modalTurmas) {
        this.modalTurmas.abrir();
      }
    }, 0);
  }

  onTurmaDesvinculada() {
    // Callback quando uma turma é desvinculada
    console.log('Turma desvinculada com sucesso');
  }
}
