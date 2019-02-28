import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'Welcome to the Star Wars database!';

  links = [
    {path: '', title: 'Home'},
    {path: '/films', title: 'Films'},
    {path: '/starships', title: 'Starships'},
    {path: '/people', title: 'People'},
  ];

  constructor(private router: Router) {}

  openPage(link) {
    this.router.navigateByUrl(link.path);
  }

  goHome() {
    this.openPage({path: ''});
  }
}
