import { Injectable } from '@angular/core';

const TOKEN = 'TOKEN';

@Injectable({
  providedIn: 'root'
})
export class ClienteLoginService {

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  logado() {
    return localStorage.getItem(TOKEN) != null;
  }

}