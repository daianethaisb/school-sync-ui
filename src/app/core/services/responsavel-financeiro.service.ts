import { Injectable, inject } from '@angular/core';
import { ApiRequestsService } from './api-requests.service';
import { ResponsavelFinanceiro } from '../models';
import { 
  CriarResponsavelFinanceiroRequest, 
  AtualizarResponsavelFinanceiroRequest 
} from '../dtos/requests';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelFinanceiroService {
  private readonly _apiService = inject(ApiRequestsService);
  private readonly _endpoint = 'responsaveisfinanceiros';

  /**
   * Lista todos os responsáveis financeiros
   */
  async listarTodos(): Promise<ResponsavelFinanceiro[]> {
    return await this._apiService.get<ResponsavelFinanceiro[]>(this._endpoint);
  }

  /**
   * Busca um responsável financeiro por ID
   */
  async buscarPorId(id: number): Promise<ResponsavelFinanceiro> {
    return await this._apiService.get<ResponsavelFinanceiro>(`${this._endpoint}/${id}`);
  }

  /**
   * Cria um novo responsável financeiro
   */
  async criar(request: CriarResponsavelFinanceiroRequest): Promise<ResponsavelFinanceiro> {
    return await this._apiService.post<CriarResponsavelFinanceiroRequest, ResponsavelFinanceiro>(
      this._endpoint, 
      request
    );
  }

  /**
   * Atualiza um responsável financeiro existente
   */
  async atualizar(id: number, request: AtualizarResponsavelFinanceiroRequest): Promise<void> {
    await this._apiService.put<AtualizarResponsavelFinanceiroRequest>(
      `${this._endpoint}/${id}`, 
      request
    );
  }

  /**
   * Exclui um responsável financeiro
   */
  async excluir(id: number): Promise<void> {
    await this._apiService.delete(`${this._endpoint}/${id}`);
  }
}
