import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurmaDisciplinaService } from '../../../core/services/turma-disciplina.service';
import { TurmaDisciplina, Disciplina } from '../../../core/models';

declare var bootstrap: any;

@Component({
  selector: 'app-modal-disciplina-turmas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-disciplina-turmas.component.html',
  styleUrl: './modal-disciplina-turmas.component.scss'
})
export class ModalDisciplinaTurmasComponent implements OnInit {
  private readonly _turmaDisciplinaService = inject(TurmaDisciplinaService);

  @Input() disciplina!: Disciplina;
  @Output() turmaDesvinculada = new EventEmitter<void>();

  turmasVinculadas: TurmaDisciplina[] = [];
  carregando = false;
  erro: string | null = null;
  
  private _modalInstance: any;
  modalId = `modal-disciplina-turmas-${Math.random().toString(36).substr(2, 9)}`;

  async ngOnInit() {
    await this._carregarDados();
  }

  async abrir() {
    await this._carregarDados();
    const modalElement = document.getElementById(this.modalId);
    if (modalElement) {
      this._modalInstance = new bootstrap.Modal(modalElement);
      this._modalInstance.show();
    }
  }

  fechar() {
    if (this._modalInstance) {
      this._modalInstance.hide();
    }
    this.erro = null;
  }

  private async _carregarDados() {
    try {
      this.carregando = true;
      this.erro = null;

      // Carregar turmas vinculadas a esta disciplina
      this.turmasVinculadas = await this._turmaDisciplinaService.listarPorDisciplina(this.disciplina.idDisciplina);

    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar turmas';
      console.error('Erro ao carregar dados:', error);
    } finally {
      this.carregando = false;
    }
  }

  async desvincularTurma(turmaDisciplina: TurmaDisciplina) {
    if (!confirm(`Deseja realmente desvincular a turma "${turmaDisciplina.nomeTurma}"?`)) {
      return;
    }

    try {
      this.carregando = true;
      this.erro = null;

      await this._turmaDisciplinaService.desvincular(turmaDisciplina.idTurmaDisciplina);
      
      // Recarregar dados
      await this._carregarDados();
      
      // Emitir evento
      this.turmaDesvinculada.emit();

    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao desvincular turma';
      console.error('Erro ao desvincular turma:', error);
    } finally {
      this.carregando = false;
    }
  }
}
