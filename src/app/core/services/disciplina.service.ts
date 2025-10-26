import { Injectable, inject } from '@angular/core';
import { ApiRequestsService } from './api-requests.service';
import { Disciplina } from '../models';
import { CriarDisciplinaRequest, AtualizarDisciplinaRequest } from '../dtos/requests';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private readonly _apiService = inject(ApiRequestsService);
  private readonly _endpoint = 'disciplinas';

  /**
   * Lista todas as disciplinas
   */
  async listarTodas(): Promise<Disciplina[]> {
    return await this._apiService.get<Disciplina[]>(this._endpoint);
  }

  /**
   * Lista apenas disciplinas ativas
   */
  async listarAtivas(): Promise<Disciplina[]> {
    return await this._apiService.get<Disciplina[]>(`${this._endpoint}/ativas`);
  }

  /**
   * Busca uma disciplina por ID
   */
  async buscarPorId(id: number): Promise<Disciplina> {
    return await this._apiService.get<Disciplina>(`${this._endpoint}/${id}`);
  }

  /**
   * Cria uma nova disciplina
   */
  async criar(request: CriarDisciplinaRequest): Promise<Disciplina> {
    return await this._apiService.post<CriarDisciplinaRequest, Disciplina>(
      this._endpoint, 
      request
    );
  }

  /**
   * Atualiza uma disciplina existente
   */
  async atualizar(id: number, request: AtualizarDisciplinaRequest): Promise<void> {
    await this._apiService.put<AtualizarDisciplinaRequest>(
      `${this._endpoint}/${id}`, 
      request
    );
  }

  /**
   * Exclui uma disciplina
   */
  async excluir(id: number): Promise<void> {
    await this._apiService.delete(`${this._endpoint}/${id}`);
  }
}
