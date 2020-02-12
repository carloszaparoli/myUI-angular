import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { ClienteLoginService } from '../cliente-login.service';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  email = '';
  senha = '';

  constructor(
    private loginService: LoginService,
    private clienteLogin: ClienteLoginService,
    private router: Router,
    private toasty: ToastyService
  ) { }


  entrar() {
    this.loginService.entrar(
      this.email,
      this.senha
    )
    .toPromise()
    .then(response => {
        if (response.token) {
          this.clienteLogin.setToken(response.token);
          this.router.navigateByUrl('/users');
          console.log(response);
        }
      },
      response => {
        this.toasty.error('Erro ao fazer login.');
        console.log(response);
      });
  }

  ngOnInit(): void {
    localStorage.clear();
  }

}
