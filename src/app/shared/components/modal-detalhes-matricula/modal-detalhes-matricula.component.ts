import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Matricula } from '../../../core/models';

@Component({
  selector: 'app-modal-detalhes-matricula',
  imports: [CommonModule],
  templateUrl: './modal-detalhes-matricula.component.html',
  styleUrl: './modal-detalhes-matricula.component.scss'
})
export class ModalDetalhesMatriculaComponent {
  @Input() matricula: Matricula | null = null;
  @Input() exibir = false;
  @Output() fechar = new EventEmitter<void>();

  fecharModal() {
    this.fechar.emit();
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
}
