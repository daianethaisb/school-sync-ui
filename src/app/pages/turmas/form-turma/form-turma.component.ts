import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TurmaService } from '../../../core/services/turma.service';
import { CriarTurmaRequest, AtualizarTurmaRequest } from '../../../core/dtos/requests';
import { Turno } from '../../../core/enums';

@Component({
  selector: 'app-form-turma',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-turma.component.html',
  styleUrl: './form-turma.component.scss'
})
export class FormTurmaComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _turmaService = inject(TurmaService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  formulario!: FormGroup;
  turnoOptions = [
    { value: Turno.Manha, label: 'Manhã' },
    { value: Turno.Tarde, label: 'Tarde' },
    { value: Turno.Noite, label: 'Noite' },
    { value: Turno.Integral, label: 'Integral' }
  ];
  
  idTurma: number | null = null;
  isEdicao = false;
  carregando = false;
  salvando = false;
  erro: string | null = null;

  async ngOnInit() {
    this._inicializarFormulario();
    
    this.idTurma = Number(this._route.snapshot.paramMap.get('id'));
    if (this.idTurma) {
      this.isEdicao = true;
      await this._carregarTurma(this.idTurma);
    }
  }

  private _inicializarFormulario() {
    const anoAtual = new Date().getFullYear();
    
    this.formulario = this._formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      anoLetivo: [anoAtual, [Validators.required, Validators.min(2000), Validators.max(2100)]],
      serie: ['', [Validators.required]],
      turno: ['', [Validators.required]],
      sala: ['', [Validators.required]],
      capacidadeMaxima: [30, [Validators.required, Validators.min(1), Validators.max(100)]],
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]]
    });
  }

  private async _carregarTurma(id: number) {
    try {
      this.carregando = true;
      const turma = await this._turmaService.buscarPorId(id);
      
      this.formulario.patchValue({
        nome: turma.nome,
        anoLetivo: turma.anoLetivo,
        serie: turma.serie,
        turno: turma.turno,
        sala: turma.sala,
        capacidadeMaxima: turma.capacidadeMaxima,
        dataInicio: new Date(turma.dataInicio).toISOString().split('T')[0],
        dataFim: new Date(turma.dataFim).toISOString().split('T')[0]
      });
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar turma';
    } finally {
      this.carregando = false;
    }
  }

  async salvar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    try {
      this.salvando = true;
      this.erro = null;

      const dados = this.formulario.value;

      if (this.isEdicao && this.idTurma) {
        const request: AtualizarTurmaRequest = dados;
        await this._turmaService.atualizar(this.idTurma, request);
      } else {
        const request: CriarTurmaRequest = dados;
        await this._turmaService.criar(request);
      }

      await this._router.navigate(['/turmas']);
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao salvar turma';
    } finally {
      this.salvando = false;
    }
  }

  cancelar() {
    this._router.navigate(['/turmas']);
  }

  getCampoErro(campo: string): string | null {
    const control = this.formulario.get(campo);
    
    if (control?.hasError('required') && control?.touched) {
      return 'Campo obrigatório';
    }
    if (control?.hasError('min') && control?.touched) {
      return `Valor mínimo: ${control.errors?.['min'].min}`;
    }
    if (control?.hasError('max') && control?.touched) {
      return `Valor máximo: ${control.errors?.['max'].max}`;
    }
    if (control?.hasError('minlength') && control?.touched) {
      return `Mínimo de ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    
    return null;
  }
}
