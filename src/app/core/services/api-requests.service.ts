import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ErrorResponse } from '../dtos/responses';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestsService {
  private readonly _http = inject(HttpClient);
  private readonly _baseUrl = environment.apiUrl;

  /**
   * Realiza uma requisição GET
   */
  async get<T>(endpoint: string): Promise<T> {
    try {
      const url = `${this._baseUrl}/${endpoint}`;
      return await firstValueFrom(
        this._http.get<T>(url).pipe(
          catchError(this._handleError)
        )
      );
    } catch (error) {
      throw this._processError(error);
    }
  }

  /**
   * Realiza uma requisição POST
   */
  async post<T, R>(endpoint: string, body: T): Promise<R> {
    try {
      const url = `${this._baseUrl}/${endpoint}`;
      console.log('POST Request:', url, body); // Debug
      return await firstValueFrom(
        this._http.post<R>(url, body).pipe(
          catchError(this._handleError)
        )
      );
    } catch (error) {
      throw this._processError(error);
    }
  }

  /**
   * Realiza uma requisição PUT
   */
  async put<T>(endpoint: string, body: T): Promise<void> {
    try {
      const url = `${this._baseUrl}/${endpoint}`;
      await firstValueFrom(
        this._http.put<void>(url, body).pipe(
          catchError(this._handleError)
        )
      );
    } catch (error) {
      throw this._processError(error);
    }
  }

  /**
   * Realiza uma requisição PATCH
   */
  async patch<T>(endpoint: string, body?: T): Promise<void> {
    try {
      const url = `${this._baseUrl}/${endpoint}`;
      await firstValueFrom(
        this._http.patch<void>(url, body).pipe(
          catchError(this._handleError)
        )
      );
    } catch (error) {
      throw this._processError(error);
    }
  }

  /**
   * Realiza uma requisição DELETE
   */
  async delete(endpoint: string): Promise<void> {
    try {
      const url = `${this._baseUrl}/${endpoint}`;
      await firstValueFrom(
        this._http.delete<void>(url).pipe(
          catchError(this._handleError)
        )
      );
    } catch (error) {
      throw this._processError(error);
    }
  }

  /**
   * Trata erros HTTP
   */
  private _handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  /**
   * Processa erros e retorna mensagem amigável
   */
  private _processError(error: any): Error {
    if (error instanceof HttpErrorResponse) {
      if (error.error && error.error.message) {
        return new Error(error.error.message);
      }
      
      switch (error.status) {
        case 400:
          return new Error('Dados inválidos. Verifique as informações e tente novamente.');
        case 404:
          return new Error('Recurso não encontrado.');
        case 500:
          return new Error('Erro interno do servidor. Tente novamente mais tarde.');
        default:
          return new Error('Ocorreu um erro inesperado. Tente novamente.');
      }
    }
    
    return new Error('Erro de conexão com o servidor.');
  }
}
