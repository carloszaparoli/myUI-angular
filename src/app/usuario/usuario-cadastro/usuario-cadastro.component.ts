import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { UsuarioService } from '../usuario.service';
import { Usuario } from 'src/app/model/usuario';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})

export class UsuarioCadastroComponent implements OnInit {

  usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private toasty: ToastyService
  ) {}

  ngOnInit(): void {
    const idUsuario = this.route.snapshot.params['id'];
    if (idUsuario) {
      this.carregarUsuario(idUsuario);
    }
  }

  carregarUsuario(id: number) {
    this.usuarioService.buscarPorId(id)
     .then(usuario => {
        this.usuario = usuario['data'];
        //console.log(usuario);
     });
  }

  atualizarUsuario(form: NgForm) {
    this.usuarioService.atualizar(this.usuario)
      .then(response => {
        this.toasty.success('Usuário alterado com sucesso!');
        console.log(response);
      });
  }

}
