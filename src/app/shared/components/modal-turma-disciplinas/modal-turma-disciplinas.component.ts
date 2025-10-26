import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TurmaDisciplinaService } from '../../../core/services/turma-disciplina.service';
import { DisciplinaService } from '../../../core/services/disciplina.service';
import { TurmaDisciplina, Disciplina, Turma } from '../../../core/models';
import { CriarTurmaDisciplinaRequest } from '../../../core/dtos/requests';

declare var bootstrap: any;

@Component({
  selector: 'app-modal-turma-disciplinas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-turma-disciplinas.component.html',
  styleUrl: './modal-turma-disciplinas.component.scss'
})
export class ModalTurmaDisciplinasComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _turmaDisciplinaService = inject(TurmaDisciplinaService);
  private readonly _disciplinaService = inject(DisciplinaService);

  @Input() turma!: Turma;
  @Output() disciplinaVinculada = new EventEmitter<void>();

  formulario!: FormGroup;
  disciplinasVinculadas: TurmaDisciplina[] = [];
  disciplinasDisponiveis: Disciplina[] = [];
  carregando = false;
  salvando = false;
  erro: string | null = null;
  mostrarFormulario = false;
  
  private _modalInstance: any;
  modalId = `modal-turma-disciplinas-${Math.random().toString(36).substr(2, 9)}`;

  async ngOnInit() {
    this._inicializarFormulario();
    await this._carregarDados();
  }

  private _inicializarFormulario() {
    this.formulario = this._formBuilder.group({
      idDisciplina: ['', [Validators.required]],
      professorNome: ['', [Validators.required, Validators.minLength(3)]]
    });
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
    this.mostrarFormulario = false;
    this.formulario.reset();
    this.erro = null;
  }

  private async _carregarDados() {
    try {
      this.carregando = true;
      this.erro = null;

      // Carregar disciplinas vinculadas
      this.disciplinasVinculadas = await this._turmaDisciplinaService.listarPorTurma(this.turma.idTurma);

      // Carregar todas as disciplinas ativas
      const todasDisciplinas = await this._disciplinaService.listarAtivas();

      // Filtrar disciplinas que já estão vinculadas
      const idsVinculados = this.disciplinasVinculadas.map(td => td.idDisciplina);
      this.disciplinasDisponiveis = todasDisciplinas.filter(d => !idsVinculados.includes(d.idDisciplina));

    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar disciplinas';
      console.error('Erro ao carregar dados:', error);
    } finally {
      this.carregando = false;
    }
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.formulario.reset();
      this.erro = null;
    }
  }

  async vincularDisciplina() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    try {
      this.salvando = true;
      this.erro = null;

      const request: CriarTurmaDisciplinaRequest = {
        idTurma: this.turma.idTurma,
        idDisciplina: this.formulario.value.idDisciplina,
        professorNome: this.formulario.value.professorNome
      };

      await this._turmaDisciplinaService.vincular(request);
      
      // Recarregar dados
      await this._carregarDados();
      
      // Resetar formulário
      this.formulario.reset();
      this.mostrarFormulario = false;
      
      // Emitir evento
      this.disciplinaVinculada.emit();

    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao vincular disciplina';
      console.error('Erro ao vincular disciplina:', error);
    } finally {
      this.salvando = false;
    }
  }

  async desvincularDisciplina(turmaDisciplina: TurmaDisciplina) {
    if (!confirm(`Deseja realmente desvincular a disciplina "${turmaDisciplina.nomeDisciplina}"?`)) {
      return;
    }

    try {
      this.carregando = true;
      this.erro = null;

      await this._turmaDisciplinaService.desvincular(turmaDisciplina.idTurmaDisciplina);
      
      // Recarregar dados
      await this._carregarDados();
      
      // Emitir evento
      this.disciplinaVinculada.emit();

    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao desvincular disciplina';
      console.error('Erro ao desvincular disciplina:', error);
    } finally {
      this.carregando = false;
    }
  }

  getCampoErro(campo: string): string | null {
    const control = this.formulario.get(campo);
    
    if (control?.hasError('required') && control?.touched) {
      return 'Campo obrigatório';
    }
    if (control?.hasError('minlength') && control?.touched) {
      return `Mínimo de ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    
    return null;
  }
}
