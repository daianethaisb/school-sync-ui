import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlunoService } from '../../../core/services/aluno.service';
import { ResponsavelFinanceiroService } from '../../../core/services/responsavel-financeiro.service';
import { CriarAlunoRequest, AtualizarAlunoRequest } from '../../../core/dtos/requests';
import { ResponsavelFinanceiro } from '../../../core/models';
import { Sexo } from '../../../core/enums';

@Component({
  selector: 'app-form-aluno',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-aluno.component.html',
  styleUrl: './form-aluno.component.scss'
})
export class FormAlunoComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _alunoService = inject(AlunoService);
  private readonly _responsavelService = inject(ResponsavelFinanceiroService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  formulario!: FormGroup;
  responsaveis: ResponsavelFinanceiro[] = [];
  sexoOptions = [
    { value: Sexo.Masculino, label: 'Masculino' },
    { value: Sexo.Feminino, label: 'Feminino' },
    { value: Sexo.Outro, label: 'Outro' }
  ];
  
  idAluno: number | null = null;
  isEdicao = false;
  carregando = false;
  salvando = false;
  erro: string | null = null;

  async ngOnInit() {
    this._inicializarFormulario();
    await this._carregarResponsaveis();
    
    this.idAluno = Number(this._route.snapshot.paramMap.get('id'));
    if (this.idAluno) {
      this.isEdicao = true;
      await this._carregarAluno(this.idAluno);
    }
  }

  private _inicializarFormulario() {
    this.formulario = this._formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      idResponsavelFinanceiro: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      necessidadesEspeciais: [''],
      observacoes: ['']
    });
  }

  private async _carregarResponsaveis() {
    try {
      this.responsaveis = await this._responsavelService.listarTodos();
    } catch (error) {
      console.error('Erro ao carregar responsáveis:', error);
    }
  }

  private async _carregarAluno(id: number) {
    try {
      this.carregando = true;
      const aluno = await this._alunoService.buscarPorId(id);
      
      this.formulario.patchValue({
        nome: aluno.nome,
        cpf: aluno.cpf,
        rg: aluno.rg || '',
        dataNascimento: new Date(aluno.dataNascimento).toISOString().split('T')[0],
        sexo: aluno.sexo,
        telefone: aluno.telefone,
        email: aluno.email,
        idResponsavelFinanceiro: aluno.idResponsavelFinanceiro,
        cep: aluno.cep || '',
        logradouro: aluno.logradouro || '',
        numero: aluno.numero || '',
        complemento: aluno.complemento || '',
        bairro: aluno.bairro || '',
        cidade: aluno.cidade || '',
        estado: aluno.estado || '',
        necessidadesEspeciais: aluno.necessidadesEspeciais || '',
        observacoes: aluno.observacoes || ''
      });
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar aluno';
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

      if (this.isEdicao && this.idAluno) {
        const request: AtualizarAlunoRequest = dados;
        await this._alunoService.atualizar(this.idAluno, request);
      } else {
        const request: CriarAlunoRequest = dados;
        await this._alunoService.criar(request);
      }

      await this._router.navigate(['/alunos']);
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao salvar aluno';
    } finally {
      this.salvando = false;
    }
  }

  cancelar() {
    this._router.navigate(['/alunos']);
  }

  getCampoErro(campo: string): string | null {
    const control = this.formulario.get(campo);
    
    if (control?.hasError('required') && control?.touched) {
      return 'Campo obrigatório';
    }
    if (control?.hasError('email') && control?.touched) {
      return 'Email inválido';
    }
    if (control?.hasError('minlength') && control?.touched) {
      return `Mínimo de ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    
    return null;
  }
}
