import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResult } from '../model/loginResult';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginUrl = 'https://reqres.in/api/login';

  constructor(private http: HttpClient) { }

  entrar(email: string, senha: string):Observable<LoginResult> {
    return this.http.post<LoginResult>(`${this.loginUrl}`, {
      email: email,
      password: senha,
      params: {
            delay: '2'
          }
    });
  }
}
