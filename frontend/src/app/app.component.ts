import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router) {}

  goBrowse($event, category) {
    $event.preventDefault();
    this.router.navigate(['browse', category]);
  }

  goSearch($event) {
    $event.preventDefault();
    this.router.navigate(['search']);
  }


}
