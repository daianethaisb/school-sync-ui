import { Injectable, inject } from '@angular/core';
import { ApiRequestsService } from './api-requests.service';
import { TurmaDisciplina } from '../models';
import { CriarTurmaDisciplinaRequest, AtualizarProfessorRequest } from '../dtos/requests';

@Injectable({
  providedIn: 'root'
})
export class TurmaDisciplinaService {
  private readonly _apiService = inject(ApiRequestsService);
  private readonly _endpoint = 'turmas-disciplinas';

  /**
   * Lista disciplinas de uma turma
   */
  async listarPorTurma(idTurma: number): Promise<TurmaDisciplina[]> {
    return await this._apiService.get<TurmaDisciplina[]>(`${this._endpoint}/turma/${idTurma}`);
  }

  /**
   * Lista turmas de uma disciplina
   */
  async listarPorDisciplina(idDisciplina: number): Promise<TurmaDisciplina[]> {
    return await this._apiService.get<TurmaDisciplina[]>(`${this._endpoint}/disciplina/${idDisciplina}`);
  }

  /**
   * Vincula uma disciplina a uma turma
   */
  async vincular(request: CriarTurmaDisciplinaRequest): Promise<TurmaDisciplina> {
    return await this._apiService.post<CriarTurmaDisciplinaRequest, TurmaDisciplina>(
      this._endpoint, 
      request
    );
  }

  /**
   * Atualiza o professor de uma disciplina
   */
  async atualizarProfessor(id: number, request: AtualizarProfessorRequest): Promise<void> {
    await this._apiService.patch<AtualizarProfessorRequest>(
      `${this._endpoint}/${id}/professor`, 
      request
    );
  }

  /**
   * Desvincula uma disciplina de uma turma
   */
  async desvincular(id: number): Promise<void> {
    await this._apiService.delete(`${this._endpoint}/${id}`);
  }
}
