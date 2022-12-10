import { TokenService } from './../autenticacao/token.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animais } from './animais';

const API = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  listaDoUsuario(nomeDousuario: string): Observable<Animais> {
    const token = this.tokenService.retornaToken();
    const headers = new HttpHeaders().append('x-acess-token', token);
    return this.httpClient.get<Animais>(`${API}/${nomeDousuario}/photos`, {
      headers
    });
  }
}
