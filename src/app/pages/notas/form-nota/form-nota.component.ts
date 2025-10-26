import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { NotaService } from '../../../core/services/nota.service';
import { MatriculaService } from '../../../core/services/matricula.service';
import { DisciplinaService } from '../../../core/services/disciplina.service';
import { CriarNotaRequest, AtualizarNotaRequest } from '../../../core/dtos/requests';
import { Matricula, Disciplina } from '../../../core/models';
import { TipoAvaliacao } from '../../../core/enums';

@Component({
  selector: 'app-form-nota',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form-nota.component.html',
  styleUrl: './form-nota.component.scss'
})
export class FormNotaComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _notaService = inject(NotaService);
  private readonly _matriculaService = inject(MatriculaService);
  private readonly _disciplinaService = inject(DisciplinaService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  formulario!: FormGroup;
  matriculas: Matricula[] = [];
  disciplinas: Disciplina[] = [];
  
  tipoAvaliacaoOptions = [
    { value: TipoAvaliacao.Prova, label: 'Prova' },
    { value: TipoAvaliacao.Trabalho, label: 'Trabalho' },
    { value: TipoAvaliacao.Atividade, label: 'Atividade' },
    { value: TipoAvaliacao.Seminario, label: 'Seminário' },
    { value: TipoAvaliacao.Participacao, label: 'Participação' }
  ];

  bimestreOptions = [
    { value: 1, label: '1º Bimestre' },
    { value: 2, label: '2º Bimestre' },
    { value: 3, label: '3º Bimestre' },
    { value: 4, label: '4º Bimestre' }
  ];
  
  idNota: number | null = null;
  isEdicao = false;
  carregando = false;
  salvando = false;
  erro: string | null = null;

  async ngOnInit() {
    this._inicializarFormulario();
    await this._carregarDados();
    
    this.idNota = Number(this._route.snapshot.paramMap.get('id'));
    if (this.idNota) {
      this.isEdicao = true;
      await this._carregarNota(this.idNota);
    }
  }

  private _inicializarFormulario() {
    this.formulario = this._formBuilder.group({
      idMatricula: ['', [Validators.required]],
      idDisciplina: ['', [Validators.required]],
      tipoAvaliacao: ['', [Validators.required]],
      bimestre: ['', [Validators.required]],
      notaValor: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      peso: ['', [Validators.required, Validators.min(0.1)]],
      dataAvaliacao: ['', [Validators.required]],
      observacoes: ['']
    });
  }

  private async _carregarDados() {
    try {
      this.carregando = true;
      [this.matriculas, this.disciplinas] = await Promise.all([
        this._matriculaService.listarTodas(),
        this._disciplinaService.listarTodas()
      ]);
      
      // Filtrar apenas matrículas ativas
      this.matriculas = this.matriculas.filter(m => m.situacao === 'Ativa');
    } catch (error) {
      this.erro = 'Erro ao carregar dados necessários';
      console.error('Erro ao carregar dados:', error);
    } finally {
      this.carregando = false;
    }
  }

  private async _carregarNota(id: number) {
    try {
      this.carregando = true;
      const nota = await this._notaService.buscarPorId(id);
      
      this.formulario.patchValue({
        idMatricula: nota.idMatricula,
        idDisciplina: nota.idDisciplina,
        tipoAvaliacao: nota.tipoAvaliacao,
        bimestre: nota.bimestre,
        notaValor: nota.notaValor,
        peso: nota.peso,
        dataAvaliacao: new Date(nota.dataAvaliacao).toISOString().split('T')[0],
        observacoes: nota.observacoes || ''
      });

      // Desabilita campos que não podem ser alterados na edição
      this.formulario.get('idMatricula')?.disable();
      this.formulario.get('idDisciplina')?.disable();
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar nota';
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

      const dados = this.formulario.getRawValue();

      if (this.isEdicao && this.idNota) {
        const request: AtualizarNotaRequest = {
          tipoAvaliacao: dados.tipoAvaliacao,
          bimestre: Number(dados.bimestre),
          notaValor: Number(dados.notaValor),
          peso: Number(dados.peso),
          dataAvaliacao: dados.dataAvaliacao,
          observacoes: dados.observacoes || undefined
        };
        await this._notaService.atualizar(this.idNota, request);
      } else {
        const request: CriarNotaRequest = {
          idMatricula: Number(dados.idMatricula),
          idDisciplina: Number(dados.idDisciplina),
          tipoAvaliacao: dados.tipoAvaliacao,
          bimestre: Number(dados.bimestre),
          notaValor: Number(dados.notaValor),
          peso: Number(dados.peso),
          dataAvaliacao: dados.dataAvaliacao,
          observacoes: dados.observacoes || undefined
        };
        await this._notaService.criar(request);
      }

      await this._router.navigate(['/notas']);
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao salvar nota';
    } finally {
      this.salvando = false;
    }
  }

  cancelar() {
    this._router.navigate(['/notas']);
  }

  getCampoErro(campo: string): string | null {
    const control = this.formulario.get(campo);
    
    if (control?.hasError('required') && control?.touched) {
      return 'Campo obrigatório';
    }
    if (control?.hasError('min') && control?.touched) {
      const min = control.errors?.['min'].min;
      return `Valor mínimo: ${min}`;
    }
    if (control?.hasError('max') && control?.touched) {
      const max = control.errors?.['max'].max;
      return `Valor máximo: ${max}`;
    }
    
    return null;
  }
}
