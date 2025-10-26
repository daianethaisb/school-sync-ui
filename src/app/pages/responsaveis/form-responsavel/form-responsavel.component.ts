import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponsavelFinanceiroService } from '../../../core/services/responsavel-financeiro.service';
import { CriarResponsavelFinanceiroRequest, AtualizarResponsavelFinanceiroRequest } from '../../../core/dtos/requests';

@Component({
  selector: 'app-form-responsavel',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-responsavel.component.html',
  styleUrl: './form-responsavel.component.scss'
})
export class FormResponsavelComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _responsavelService = inject(ResponsavelFinanceiroService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  formulario!: FormGroup;
  
  idResponsavel: number | null = null;
  isEdicao = false;
  carregando = false;
  salvando = false;
  erro: string | null = null;

  async ngOnInit() {
    this._inicializarFormulario();
    
    this.idResponsavel = Number(this._route.snapshot.paramMap.get('id'));
    if (this.idResponsavel) {
      this.isEdicao = true;
      await this._carregarResponsavel(this.idResponsavel);
    }
  }

  private _inicializarFormulario() {
    this.formulario = this._formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]]
    });
  }

  private async _carregarResponsavel(id: number) {
    try {
      this.carregando = true;
      const responsavel = await this._responsavelService.buscarPorId(id);
      
      this.formulario.patchValue({
        nome: responsavel.nome,
        cpf: responsavel.cpf,
        rg: responsavel.rg || '',
        dataNascimento: new Date(responsavel.dataNascimento).toISOString().split('T')[0],
        telefone: responsavel.telefone,
        celular: responsavel.celular,
        email: responsavel.email,
        cep: responsavel.cep,
        logradouro: responsavel.logradouro,
        numero: responsavel.numero,
        complemento: responsavel.complemento || '',
        bairro: responsavel.bairro,
        cidade: responsavel.cidade,
        estado: responsavel.estado
      });
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar responsável';
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

      if (this.isEdicao && this.idResponsavel) {
        const request: AtualizarResponsavelFinanceiroRequest = dados;
        await this._responsavelService.atualizar(this.idResponsavel, request);
      } else {
        const request: CriarResponsavelFinanceiroRequest = dados;
        await this._responsavelService.criar(request);
      }

      await this._router.navigate(['/responsaveis']);
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao salvar responsável';
    } finally {
      this.salvando = false;
    }
  }

  cancelar() {
    this._router.navigate(['/responsaveis']);
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