import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {FilmsComponent} from "./components/films/films.component";
import {StarshipsComponent} from "./components/starships/starships.component";
import {PeopleComponent} from "./components/people/people.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'films', component: FilmsComponent},
  {path: 'starships', component: StarshipsComponent},
  {path: 'people', component: PeopleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
