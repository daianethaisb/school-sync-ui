import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatriculaService } from '../../../core/services/matricula.service';
import { Matricula } from '../../../core/models';
import { ModalDetalhesMatriculaComponent } from '../../../shared/components/modal-detalhes-matricula/modal-detalhes-matricula.component';

@Component({
  selector: 'app-lista-matriculas',
  imports: [CommonModule, RouterLink, ModalDetalhesMatriculaComponent],
  templateUrl: './lista-matriculas.component.html',
  styleUrl: './lista-matriculas.component.scss'
})
export class ListaMatriculasComponent implements OnInit {
  private readonly _matriculaService = inject(MatriculaService);
  
  matriculas: Matricula[] = [];
  carregando = false;
  erro: string | null = null;
  matriculaSelecionada: Matricula | null = null;
  exibirModal = false;

  async ngOnInit() {
    await this.carregarMatriculas();
  }

  async carregarMatriculas() {
    try {
      this.carregando = true;
      this.erro = null;
      this.matriculas = await this._matriculaService.listarTodas();
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar matrículas';
      console.error('Erro ao carregar matrículas:', error);
    } finally {
      this.carregando = false;
    }
  }

  async cancelarMatricula(id: number) {
    if (!confirm('Deseja realmente cancelar esta matrícula?')) {
      return;
    }

    try {
      await this._matriculaService.cancelar(id);
      await this.carregarMatriculas();
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao cancelar matrícula';
      console.error('Erro ao cancelar matrícula:', error);
    }
  }

  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  formatarValor(valor: number): string {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(valor);
  }

  getSituacaoClass(situacao: string): string {
    switch (situacao) {
      case 'Ativa':
        return 'bg-success';
      case 'Cancelada':
        return 'bg-danger';
      case 'Concluida':
        return 'bg-primary';
      case 'Trancada':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  }

  abrirDetalhes(matricula: Matricula) {
    this.matriculaSelecionada = matricula;
    this.exibirModal = true;
  }

  fecharModal() {
    this.exibirModal = false;
    this.matriculaSelecionada = null;
  }
}
