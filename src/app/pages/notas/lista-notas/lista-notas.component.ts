import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotaService } from '../../../core/services/nota.service';
import { Nota } from '../../../core/models';

@Component({
  selector: 'app-lista-notas',
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-notas.component.html',
  styleUrl: './lista-notas.component.scss'
})
export class ListaNotasComponent implements OnInit {
  private readonly _notaService = inject(NotaService);
  
  notas: Nota[] = [];
  carregando = false;
  erro: string | null = null;
  bimestreSelecionado: number | null = null;

  async ngOnInit() {
    await this.carregarNotas();
  }

  async carregarNotas() {
    try {
      this.carregando = true;
      this.erro = null;
      
      if (this.bimestreSelecionado) {
        this.notas = await this._notaService.listarPorBimestre(this.bimestreSelecionado);
      } else {
        this.notas = await this._notaService.listarTodas();
      }
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao carregar notas';
      console.error('Erro ao carregar notas:', error);
    } finally {
      this.carregando = false;
    }
  }

  async excluirNota(id: number) {
    if (!confirm('Deseja realmente excluir esta nota?')) {
      return;
    }

    try {
      await this._notaService.excluir(id);
      await this.carregarNotas();
    } catch (error) {
      this.erro = error instanceof Error ? error.message : 'Erro ao excluir nota';
      console.error('Erro ao excluir nota:', error);
    }
  }

  async filtrarPorBimestre(bimestre: number) {
    this.bimestreSelecionado = bimestre;
    await this.carregarNotas();
  }

  async limparFiltro() {
    this.bimestreSelecionado = null;
    await this.carregarNotas();
  }

  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  formatarTipoAvaliacao(tipo: string): string {
    // Mapeia o tipo de avaliação para exibição
    const tiposMap: { [key: string]: string } = {
      'Prova': 'Prova',
      'Trabalho': 'Trabalho',
      'Atividade': 'Atividade',
      'Seminario': 'Seminário',
      'Seminário': 'Seminário',
      'Participacao': 'Participação',
      'Participação': 'Participação'
    };
    return tiposMap[tipo] || tipo;
  }

  getNotaClass(nota: number): string {
    if (nota >= 7) return 'text-success fw-bold';
    if (nota >= 5) return 'text-warning fw-bold';
    return 'text-danger fw-bold';
  }
}
