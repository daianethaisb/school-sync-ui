import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatriculaService } from '../../../core/services/matricula.service';
import { AlunoService } from '../../../core/services/aluno.service';
import { TurmaService } from '../../../core/services/turma.service';
import { CriarMatriculaRequest, AtualizarMatriculaRequest } from '../../../core/dtos/requests';
import { Aluno, Turma } from '../../../core/models';

@Component({
  selector: 'app-form-matricula',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './form-matricula.component.html',
  styleUrl: './form-matricula.component.scss'
})
export class FormMatriculaComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _matriculaService = inject(MatriculaService);
  private readonly _alunoService = inject(AlunoService);
  private readonly _turmaService = inject(TurmaService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  formulario!: FormGroup;
  alunos: Aluno[] = [];
  turmas: Turma[] = [];
  
  idMatricula: number | null = null;
  isEdicao = false;
  carregando = false;
  salvando = false;
  erro: string | null = null;

  async ngOnInit() {
    this._inicializarFormulario();
    await this._carregarDados();
    
    this.idMatricula = Number(this._route.snapshot.paramMap.get('id'));
    if (this.idMatricula) {
      this.isEdicao = true;
      await this._carregarMatricula(this.idMatricula);
    }
  }

  private _inicializarFormulario() {
    this.formulario = this._formBuilder.group({
      idAluno: ['', [Validators.required]],
      idTurma: ['', [Validators.required]],
      dataMatricula: ['', [Validators.required]],
      numeroMatricula: ['', [Validators.required]],
      valorMensalidade: ['', [Validators.required, Validators.min(0)]],
      diaVencimento: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      observacoes: ['']
    });
  }

  private async _carregarDados() {
    try {
      this.carregando = true;
      [this.alunos, this.turmas] = await Promise.all([
        this._alunoService.listarTodos(),
        this._turmaService.listarTodas()
      ]);
    } catch (error) {
      this.erro = 'Erro ao carregar dados necessários';
      console.error('Erro ao carregar dados:', error);
    } finally {
      this.carregando = false;
    }
  }

  private async _carregarMatricula(id: number) {
    try {
      this.carregando = true;
      const matricula = await this._matriculaService.buscarPorId(id);
      
      this.formulario.patchValue({
        idAluno: matricula.idAluno,
        idTurma: matricula.idTurma,
        dataMatricula: new Date(matricula.dataMatricula).toISOString().split('T')[0],
        numeroMatricula: matricula.numeroMatricula,
        valorMensalidade: matricula.valorMensalidade,
        diaVencimento: matricula.diaVencimento,
        observacoes: matricula.observacoes || ''
      });

      // Desabilita campos que não podem ser alterados na edição
      this.formulario.get('idAluno')?.disable();
      this.formulario.get('idTurma')?.disable();
      this.formulario.get('dataMatricula')?.disable();
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar matrícula';
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

      if (this.isEdicao && this.idMatricula) {
        const request: AtualizarMatriculaRequest = {
          numeroMatricula: dados.numeroMatricula,
          valorMensalidade: Number(dados.valorMensalidade),
          diaVencimento: Number(dados.diaVencimento),
          observacoes: dados.observacoes
        };
        await this._matriculaService.atualizar(this.idMatricula, request);
      } else {
        const request: CriarMatriculaRequest = {
          idAluno: Number(dados.idAluno),
          idTurma: Number(dados.idTurma),
          dataMatricula: dados.dataMatricula,
          numeroMatricula: dados.numeroMatricula,
          valorMensalidade: Number(dados.valorMensalidade),
          diaVencimento: Number(dados.diaVencimento),
          observacoes: dados.observacoes
        };
        await this._matriculaService.criar(request);
      }

      await this._router.navigate(['/matriculas']);
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao salvar matrícula';
    } finally {
      this.salvando = false;
    }
  }

  cancelar() {
    this._router.navigate(['/matriculas']);
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
    
    return null;
  }

  getTurmasDisponiveis(): Turma[] {
    return this.turmas.filter(t => t.ativo && t.vagasDisponiveis && t.vagasDisponiveis > 0);
  }
}
