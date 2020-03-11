import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { ToastyModule } from 'ng2-toasty';

import { AppComponent } from './app.component';
import { UsuarioService } from './usuario/usuario.service';
import { NavbarComponent } from './navbar/navbar.component';
import { UsuarioListaComponent } from './usuario/usuario-lista/usuario-lista.component';
import { UsuarioCadastroComponent } from './usuario/usuario-cadastro/usuario-cadastro.component';
import { Routes, RouterModule } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { NeedAuthGuard } from './login/auth.guard';
import { Interceptor } from './login/interceptor.module';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { LoaderInterceptor } from './loader/loader.interceptor';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'users', component: UsuarioListaComponent, canActivate: [NeedAuthGuard]},
  { path: 'users/:id', component: UsuarioCadastroComponent, canActivate: [NeedAuthGuard] },
  { path: '404', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsuarioListaComponent,
    UsuarioCadastroComponent,
    PaginaNaoEncontradaComponent,
    LoginFormComponent,
    LoaderComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Interceptor,
    HttpClientModule,
    NgxPaginationModule,    
    RouterModule.forRoot(routes),
    
    ToastyModule.forRoot()
  ],
  providers: [ UsuarioService, NeedAuthGuard, LoaderService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
