import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {
  config: any;
  usuarios: [];

  constructor(
    private usuarioService: UsuarioService,
    private toasty: ToastyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.listar(1);
  }

  listar(pagina: number) {
    this.usuarioService.listar(pagina)
      .then(resultado => {
          this.usuarios = resultado.usuarios;          
          this.config = {
            totalItems: resultado.total,
            currentPage: pagina,
            itemsPerPage: 6
          }
      });
  }

  excluir(id) {
    if (confirm("Tem certeza que deseja deletar este registro?")) {
      this.usuarioService.excluir(id)
        .then(() => {
          this.toasty.success("Usuário excluído com sucesso!");
        });
    }
  }

}