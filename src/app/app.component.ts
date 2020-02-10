import { Component } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myapp-spa';

  constructor(
    private router: Router
  ){}


  mostraMenu() {
    return this.router.url !== '/login';
  }

}
