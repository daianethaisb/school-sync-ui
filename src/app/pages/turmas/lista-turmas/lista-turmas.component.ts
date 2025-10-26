import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TurmaService } from '../../../core/services/turma.service';
import { Turma } from '../../../core/models';
import { ModalTurmaDisciplinasComponent } from '../../../shared/components/modal-turma-disciplinas/modal-turma-disciplinas.component';

@Component({
  selector: 'app-lista-turmas',
  imports: [CommonModule, RouterLink, ModalTurmaDisciplinasComponent],
  templateUrl: './lista-turmas.component.html',
  styleUrl: './lista-turmas.component.scss'
})
export class ListaTurmasComponent implements OnInit {
  private readonly _turmaService = inject(TurmaService);
  
  @ViewChild(ModalTurmaDisciplinasComponent) modalDisciplinas!: ModalTurmaDisciplinasComponent;
  
  turmas: Turma[] = [];
  carregando = false;
  erro: string | null = null;
  anoSelecionado: number | null = null;
  turmaSelecionada: Turma | null = null;

  async ngOnInit() {
    await this.carregarTurmas();
  }

  async carregarTurmas() {
    try {
      this.carregando = true;
      this.erro = null;
      
      if (this.anoSelecionado) {
        this.turmas = await this._turmaService.listarPorAno(this.anoSelecionado);
      } else {
        this.turmas = await this._turmaService.listarTodas();
      }
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar turmas';
      console.error('Erro ao carregar turmas:', error);
    } finally {
      this.carregando = false;
    }
  }

  async excluirTurma(id: number) {
    if (!confirm('Deseja realmente excluir esta turma?')) {
      return;
    }

    try {
      await this._turmaService.excluir(id);
      await this.carregarTurmas();
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao excluir turma';
      console.error('Erro ao excluir turma:', error);
    }
  }

  async filtrarPorAno(ano: number) {
    this.anoSelecionado = ano;
    await this.carregarTurmas();
  }

  async limparFiltro() {
    this.anoSelecionado = null;
    await this.carregarTurmas();
  }

  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  abrirModalDisciplinas(turma: Turma) {
    this.turmaSelecionada = turma;
    // Aguarda um ciclo de detecção de mudanças antes de abrir o modal
    setTimeout(() => {
      if (this.modalDisciplinas) {
        this.modalDisciplinas.abrir();
      }
    }, 0);
  }

  onDisciplinaVinculada() {
    // Callback quando uma disciplina é vinculada/desvinculada
    // Pode ser usado para atualizar a lista de turmas se necessário
    console.log('Disciplina vinculada/desvinculada com sucesso');
  }
}
