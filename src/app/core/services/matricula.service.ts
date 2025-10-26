import { Injectable, inject } from '@angular/core';
import { ApiRequestsService } from './api-requests.service';
import { Matricula } from '../models';
import { CriarMatriculaRequest, AtualizarMatriculaRequest } from '../dtos/requests';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
  private readonly _apiService = inject(ApiRequestsService);
  private readonly _endpoint = 'matriculas';

  /**
   * Lista todas as matrículas
   */
  async listarTodas(): Promise<Matricula[]> {
    return await this._apiService.get<Matricula[]>(this._endpoint);
  }

  /**
   * Busca uma matrícula por ID
   */
  async buscarPorId(id: number): Promise<Matricula> {
    return await this._apiService.get<Matricula>(`${this._endpoint}/${id}`);
  }

  /**
   * Lista matrículas de um aluno
   */
  async listarPorAluno(idAluno: number): Promise<Matricula[]> {
    return await this._apiService.get<Matricula[]>(`${this._endpoint}/aluno/${idAluno}`);
  }

  /**
   * Cria uma nova matrícula
   */
  async criar(request: CriarMatriculaRequest): Promise<Matricula> {
    return await this._apiService.post<CriarMatriculaRequest, Matricula>(
      this._endpoint, 
      request
    );
  }

  /**
   * Atualiza uma matrícula existente
   */
  async atualizar(id: number, request: AtualizarMatriculaRequest): Promise<void> {
    await this._apiService.put<AtualizarMatriculaRequest>(
      `${this._endpoint}/${id}`, 
      request
    );
  }

  /**
   * Cancela uma matrícula
   */
  async cancelar(id: number): Promise<void> {
    await this._apiService.patch(`${this._endpoint}/${id}/cancelar`);
  }
}
