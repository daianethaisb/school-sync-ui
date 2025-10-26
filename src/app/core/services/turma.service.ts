import { Injectable, inject } from '@angular/core';
import { ApiRequestsService } from './api-requests.service';
import { Turma } from '../models';
import { CriarTurmaRequest, AtualizarTurmaRequest } from '../dtos/requests';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  private readonly _apiService = inject(ApiRequestsService);
  private readonly _endpoint = 'turmas';

  /**
   * Lista todas as turmas
   */
  async listarTodas(): Promise<Turma[]> {
    return await this._apiService.get<Turma[]>(this._endpoint);
  }

  /**
   * Busca uma turma por ID
   */
  async buscarPorId(id: number): Promise<Turma> {
    return await this._apiService.get<Turma>(`${this._endpoint}/${id}`);
  }

  /**
   * Lista turmas por ano letivo
   */
  async listarPorAno(ano: number): Promise<Turma[]> {
    return await this._apiService.get<Turma[]>(`${this._endpoint}/ano/${ano}`);
  }

  /**
   * Cria uma nova turma
   */
  async criar(request: CriarTurmaRequest): Promise<Turma> {
    return await this._apiService.post<CriarTurmaRequest, Turma>(
      this._endpoint, 
      request
    );
  }

  /**
   * Atualiza uma turma existente
   */
  async atualizar(id: number, request: AtualizarTurmaRequest): Promise<void> {
    await this._apiService.put<AtualizarTurmaRequest>(
      `${this._endpoint}/${id}`, 
      request
    );
  }

  /**
   * Exclui uma turma
   */
  async excluir(id: number): Promise<void> {
    await this._apiService.delete(`${this._endpoint}/${id}`);
  }
}
