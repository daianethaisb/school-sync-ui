import { Injectable, inject } from '@angular/core';
import { ApiRequestsService } from './api-requests.service';
import { Aluno } from '../models';
import { CriarAlunoRequest, AtualizarAlunoRequest } from '../dtos/requests';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private readonly _apiService = inject(ApiRequestsService);
  private readonly _endpoint = 'alunos';

  /**
   * Lista todos os alunos
   */
  async listarTodos(): Promise<Aluno[]> {
    return await this._apiService.get<Aluno[]>(this._endpoint);
  }

  /**
   * Busca um aluno por ID
   */
  async buscarPorId(id: number): Promise<Aluno> {
    return await this._apiService.get<Aluno>(`${this._endpoint}/${id}`);
  }

  /**
   * Lista alunos por responsável financeiro
   */
  async listarPorResponsavel(idResponsavel: number): Promise<Aluno[]> {
    return await this._apiService.get<Aluno[]>(`${this._endpoint}/responsavel/${idResponsavel}`);
  }

  /**
   * Cria um novo aluno
   */
  async criar(request: CriarAlunoRequest): Promise<Aluno> {
    return await this._apiService.post<CriarAlunoRequest, Aluno>(
      this._endpoint, 
      request
    );
  }

  /**
   * Atualiza um aluno existente
   */
  async atualizar(id: number, request: AtualizarAlunoRequest): Promise<void> {
    await this._apiService.put<AtualizarAlunoRequest>(
      `${this._endpoint}/${id}`, 
      request
    );
  }

  /**
   * Exclui um aluno
   */
  async excluir(id: number): Promise<void> {
    await this._apiService.delete(`${this._endpoint}/${id}`);
  }
}
