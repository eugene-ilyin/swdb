import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit {

  pages = [];
  constructor(private router: Router) { }

  ngOnInit() {
    this.pages = [
      {
        title: 'Films',
        path: '/films'
      },
      {
        title: 'Starships',
        path: '/starships'
      },
      {
        title: 'People',
        path: '/people'
      },
    ];
  }

  openPage(link) {
    this.router.navigateByUrl(link.path);
  }
}
