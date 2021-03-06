import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { ToastyService } from 'ng2-toasty';
import { Usuario } from 'src/app/model/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-usuario-lista',
  templateUrl: './usuario-lista.component.html',
  styleUrls: ['./usuario-lista.component.css']
})
export class UsuarioListaComponent implements OnInit {
  config: any = {};
  usuarios: Usuario[];
  paginas = [];

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private toasty: ToastyService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(x => this.listar(x.page || 1));
  }

  listar(pagina: number) {
    this.usuarioService.listar(pagina)
      .then(resultado => {
        this.paginas = [];
        this.usuarios = resultado.usuarios;
        for (let index = 1; index <= resultado.totalPaginas; index++) {
          this.paginas.push(index);
        }
        this.config = {
          totalItems: resultado.total,
          paginaAtual: resultado.paginaAtual,
          totalPaginas: resultado.totalPaginas,
          itensPorPagina: resultado.itensPorPagina,
          paginas: this.paginas
        }
        if (pagina < 1 || pagina > this.config.totalPaginas) {
          this.router.navigate(['/404']);
        }
      });
  }

  excluir(usuario: Usuario) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'Excluir',
      message: "Tem certeza que deseja excluir este usuário?"
    };
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result) {
        this.usuarioService.excluir(usuario)
          .then(resultado => {
            let posicao = this.usuarios.indexOf(usuario);
            this.usuarios.splice(posicao, 1);
            this.toasty.success("Usuário excluído com sucesso!");            
          });
      }
    });
  }
}