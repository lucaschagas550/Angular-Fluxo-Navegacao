import { Comentario, Comentarios } from './comentarios';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(
    private httpClient: HttpClient) { }

  buscaComentario(id: number): Observable<Comentarios> {
    return this.httpClient.get<Comentarios>(`${API}/photos/${id}/comments`);
  }

  incluiComentario(id: number, commentText: string): Observable<Comentario> {
    return this.httpClient.post<Comentario>(`${API}/photos/${id}/comments`, {
      commentText: commentText //body da requisicao, como tem o mesmo nome do atributo no precisaria atributir, bastava o nome 'commentText' sem os dois pontos
    });
  }
}
