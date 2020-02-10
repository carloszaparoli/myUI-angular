import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  usuariosUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  listar(page) {
    return this.http.get<any>(`${this.usuariosUrl}`, {
      params: {
        page: page.toString(),
        delay: '2'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        const responseJson = response.body;
        const usuarios = responseJson.data;
        
        const resultado = {
          usuarios,
          total: responseJson.total,
          paginaAtual: responseJson.page
        };
        return resultado;
      });
  }

  atualizar(usuario: Usuario)  {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');
    
    return this.http.put<Usuario>(`${this.usuariosUrl}/${usuario.id}`,
        JSON.stringify(usuario),
        { 
          headers: httpHeaders,
          params: {
            delay: '2'
          },
          observe: 'response' 
        })
      .toPromise()
      .then(response => {
        console.log(response);
      });
  }

  buscarPorId(id: number) {
    return this.http.get<Usuario>(`${this.usuariosUrl}/${id}`, { 
      params: {
        delay: '2'
      },
      observe: 'response'
     })
      .toPromise()
      .then(response => {
        const usuario = response.body as Usuario;
        return usuario;
      });
  }

  excluir(id: number): Promise<void> {
    // console.log(`${this.usuariosUrl}/${id}`);
    return this.http.delete<number>(`${this.usuariosUrl}/${id}`, { 
      params: {
        delay: '2'
      },
      observe: 'response'
     })
      .toPromise()
      .then(() => {       
      });
  }
}
