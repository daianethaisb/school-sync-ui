import { Injectable, inject } from '@angular/core';
import { ApiRequestsService } from './api-requests.service';
import { Nota } from '../models';
import { 
  BoletimResponse, 
  MediaBimestreResponse, 
  MediaFinalResponse 
} from '../dtos/responses';
import { CriarNotaRequest, AtualizarNotaRequest } from '../dtos/requests';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  private readonly _apiService = inject(ApiRequestsService);
  private readonly _endpoint = 'notas';

  /**
   * Lista todas as notas
   */
  async listarTodas(): Promise<Nota[]> {
    return await this._apiService.get<Nota[]>(this._endpoint);
  }

  /**
   * Busca uma nota por ID
   */
  async buscarPorId(id: number): Promise<Nota> {
    return await this._apiService.get<Nota>(`${this._endpoint}/${id}`);
  }

  /**
   * Lista notas de uma matrícula
   */
  async listarPorMatricula(idMatricula: number): Promise<Nota[]> {
    return await this._apiService.get<Nota[]>(`${this._endpoint}/matricula/${idMatricula}`);
  }

  /**
   * Lista notas por matrícula e disciplina
   */
  async listarPorMatriculaEDisciplina(idMatricula: number, idDisciplina: number): Promise<Nota[]> {
    return await this._apiService.get<Nota[]>(
      `${this._endpoint}/matricula/${idMatricula}/disciplina/${idDisciplina}`
    );
  }

  /**
   * Lista notas por bimestre
   */
  async listarPorBimestre(bimestre: number): Promise<Nota[]> {
    return await this._apiService.get<Nota[]>(`${this._endpoint}/bimestre/${bimestre}`);
  }

  /**
   * Obtém o boletim completo do aluno
   */
  async obterBoletim(idMatricula: number): Promise<BoletimResponse> {
    return await this._apiService.get<BoletimResponse>(`${this._endpoint}/boletim/${idMatricula}`);
  }

  /**
   * Calcula a média de um bimestre
   */
  async calcularMediaBimestre(
    idMatricula: number, 
    idDisciplina: number, 
    bimestre: number
  ): Promise<MediaBimestreResponse> {
    return await this._apiService.get<MediaBimestreResponse>(
      `${this._endpoint}/media/matricula/${idMatricula}/disciplina/${idDisciplina}/bimestre/${bimestre}`
    );
  }

  /**
   * Calcula a média final de uma disciplina
   */
  async calcularMediaFinal(idMatricula: number, idDisciplina: number): Promise<MediaFinalResponse> {
    return await this._apiService.get<MediaFinalResponse>(
      `${this._endpoint}/media-final/matricula/${idMatricula}/disciplina/${idDisciplina}`
    );
  }

  /**
   * Cria uma nova nota
   */
  async criar(request: CriarNotaRequest): Promise<Nota> {
    return await this._apiService.post<CriarNotaRequest, Nota>(
      this._endpoint, 
      request
    );
  }

  /**
   * Atualiza uma nota existente
   */
  async atualizar(id: number, request: AtualizarNotaRequest): Promise<void> {
    await this._apiService.put<AtualizarNotaRequest>(
      `${this._endpoint}/${id}`, 
      request
    );
  }

  /**
   * Exclui uma nota
   */
  async excluir(id: number): Promise<void> {
    await this._apiService.delete(`${this._endpoint}/${id}`);
  }
}
