import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DisciplinaService } from '../../../core/services/disciplina.service';
import { CriarDisciplinaRequest, AtualizarDisciplinaRequest } from '../../../core/dtos/requests';

@Component({
  selector: 'app-form-disciplina',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-disciplina.component.html',
  styleUrl: './form-disciplina.component.scss'
})
export class FormDisciplinaComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _disciplinaService = inject(DisciplinaService);
  private readonly _router = inject(Router);
  private readonly _route = inject(ActivatedRoute);

  formulario!: FormGroup;
  
  idDisciplina: number | null = null;
  isEdicao = false;
  carregando = false;
  salvando = false;
  erro: string | null = null;

  async ngOnInit() {
    this._inicializarFormulario();
    
    this.idDisciplina = Number(this._route.snapshot.paramMap.get('id'));
    if (this.idDisciplina) {
      this.isEdicao = true;
      await this._carregarDisciplina(this.idDisciplina);
    }
  }

  private _inicializarFormulario() {
    this.formulario = this._formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      codigo: ['', [Validators.required]],
      cargaHoraria: [60, [Validators.required, Validators.min(1), Validators.max(500)]],
      descricao: ['']
    });
  }

  private async _carregarDisciplina(id: number) {
    try {
      this.carregando = true;
      const disciplina = await this._disciplinaService.buscarPorId(id);
      
      this.formulario.patchValue({
        nome: disciplina.nome,
        codigo: disciplina.codigo,
        cargaHoraria: disciplina.cargaHoraria,
        descricao: disciplina.descricao || ''
      });
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar disciplina';
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

      if (this.isEdicao && this.idDisciplina) {
        const request: AtualizarDisciplinaRequest = dados;
        await this._disciplinaService.atualizar(this.idDisciplina, request);
      } else {
        const request: CriarDisciplinaRequest = dados;
        await this._disciplinaService.criar(request);
      }

      await this._router.navigate(['/disciplinas']);
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao salvar disciplina';
    } finally {
      this.salvando = false;
    }
  }

  cancelar() {
    this._router.navigate(['/disciplinas']);
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
