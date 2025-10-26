import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstatisticasService } from '../../../core/services';
import { EstatisticasDashboardResponse } from '../../../core/dtos/responses';

@Component({
  selector: 'app-estatisticas-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estatisticas-dashboard.component.html',
  styleUrl: './estatisticas-dashboard.component.scss'
})
export class EstatisticasDashboardComponent implements OnInit {
  private readonly _estatisticasService = inject(EstatisticasService);

  estatisticas?: EstatisticasDashboardResponse;
  carregando = true;
  erro = false;

  async ngOnInit(): Promise<void> {
    await this.carregarEstatisticas();
  }

  async carregarEstatisticas(): Promise<void> {
    try {
      this.carregando = true;
      this.erro = false;
      this.estatisticas = await this._estatisticasService.obterEstatisticasDashboard();
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      this.erro = true;
    } finally {
      this.carregando = false;
    }
  }

  calcularPercentualAlunos(): number {
    if (!this.estatisticas || this.estatisticas.totalAlunos === 0) return 0;
    return (this.estatisticas.totalAlunosAtivos / this.estatisticas.totalAlunos) * 100;
  }

  calcularPercentualMatriculas(): number {
    if (!this.estatisticas || this.estatisticas.totalMatriculas === 0) return 0;
    return (this.estatisticas.totalMatriculasAtivas / this.estatisticas.totalMatriculas) * 100;
  }

  obterClasseMedia(media: number): string {
    if (media >= 9) return 'text-success';
    if (media >= 7) return 'text-primary';
    if (media >= 5) return 'text-warning';
    return 'text-danger';
  }

  obterClasseOcupacao(percentual: number): string {
    if (percentual >= 90) return 'bg-danger';
    if (percentual >= 70) return 'bg-warning';
    return 'bg-primary';
  }
}
