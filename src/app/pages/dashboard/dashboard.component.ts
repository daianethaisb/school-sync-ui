import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EstatisticasDashboardComponent } from '../../shared/components/estatisticas-dashboard/estatisticas-dashboard.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, EstatisticasDashboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
}
