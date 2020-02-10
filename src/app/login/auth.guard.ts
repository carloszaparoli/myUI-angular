import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { ClienteLoginService } from './cliente-login.service';


@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private clienteLoginService: ClienteLoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const redirectUrl = route['_routerState']['url'];

    if (this.clienteLoginService.logado()) {
      return true;
    }

    this.router.navigate(['/login']);

    return false;
  }
}
