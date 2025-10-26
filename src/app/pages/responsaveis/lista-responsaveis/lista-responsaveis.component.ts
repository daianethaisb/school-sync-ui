import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ResponsavelFinanceiroService } from '../../../core/services/responsavel-financeiro.service';
import { ResponsavelFinanceiro } from '../../../core/models';

@Component({
  selector: 'app-lista-responsaveis',
  imports: [CommonModule],
  templateUrl: './lista-responsaveis.component.html',
  styleUrl: './lista-responsaveis.component.scss'
})
export class ListaResponsaveisComponent implements OnInit {
  private readonly _responsavelService = inject(ResponsavelFinanceiroService);
  private readonly _router = inject(Router);
  
  responsaveis: ResponsavelFinanceiro[] = [];
  carregando = false;
  erro: string | null = null;
  responsavelDetalhes: ResponsavelFinanceiro | null = null;
  mostrarModal = false;

  async ngOnInit() {
    await this.carregarResponsaveis();
  }

  async carregarResponsaveis() {
    try {
      this.carregando = true;
      this.erro = null;
      this.responsaveis = await this._responsavelService.listarTodos();
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar responsáveis financeiros';
      console.error('Erro ao carregar responsáveis:', error);
    } finally {
      this.carregando = false;
    }
  }

  novoResponsavel() {
    this._router.navigate(['/responsaveis/novo']);
  }

  editarResponsavel(id: number) {
    this._router.navigate(['/responsaveis', id]);
  }

  async verDetalhes(id: number) {
    try {
      this.responsavelDetalhes = await this._responsavelService.buscarPorId(id);
      this.mostrarModal = true;
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar detalhes do responsável';
    }
  }

  fecharModal() {
    this.mostrarModal = false;
    this.responsavelDetalhes = null;
  }

  async excluirResponsavel(id: number) {
    if (!confirm('Deseja realmente excluir este responsável financeiro?')) {
      return;
    }

    try {
      await this._responsavelService.excluir(id);
      await this.carregarResponsaveis();
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao excluir responsável';
      console.error('Erro ao excluir responsável:', error);
    }
  }

  formatarTelefone(telefone: string): string {
    return telefone || '-';
  }

  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
}
