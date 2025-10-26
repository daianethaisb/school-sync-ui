import { inject, Injectable } from '@angular/core';
import { ApiRequestsService } from './api-requests.service';
import { EstatisticasDashboardResponse } from '../dtos/responses';

@Injectable({
  providedIn: 'root'
})
export class EstatisticasService {
  private readonly _apiRequestsService = inject(ApiRequestsService);

  async obterEstatisticasDashboard(): Promise<EstatisticasDashboardResponse> {
    return await this._apiRequestsService.get<EstatisticasDashboardResponse>('Estatisticas/dashboard');
  }
}
