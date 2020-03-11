import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  usuariosUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient, private router: Router) { }

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
          usuarios: usuarios,
          total: responseJson.total,
          paginaAtual: responseJson.page,
          totalPaginas: responseJson.total_pages,
          itensPorPagina: responseJson.per_page
        };
        return resultado;
      });
  }

  atualizar(usuario: Usuario) {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('Content-Type', 'application/json');

    return this.http.put<Usuario>(`${this.usuariosUrl}/${usuario.id}`,
      usuario,
      {
        headers: httpHeaders,
        params: {
          delay: '2'
        },
        observe: 'response'
      })
      .toPromise()
      .then(response => {
        // Response Http com status 200 e body
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
        console.log(response);
        const usuario = response.body as Usuario;
        return usuario;
      });
  }

  excluir(usuario: Usuario): Promise<void> {
    // console.log(`${this.usuariosUrl}/${id}`);
    return this.http.delete(`${this.usuariosUrl}/${usuario.id}`, {
      params: {
        delay: '2'
      },
      observe: 'response'
    })
      .toPromise()
      .then(response => {
        // Response Http com status 204
        console.log(response);
      });
  }
}
