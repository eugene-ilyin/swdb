import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FilmsComponent } from './components/films/films.component';
import {
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule, MatPaginatorModule, MatProgressBarModule,
  MatSelectModule,
  MatTableModule
} from "@angular/material";
import {SWResourceService} from "./resources/sw-resource.service";
import {HttpClientModule} from "@angular/common/http";
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { DialogInfoComponent } from './components/dialog-info/dialog-info.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonTableComponent } from './components/common-table/common-table.component';
import { StarshipsComponent } from './components/starships/starships.component';
import { PeopleComponent } from './components/people/people.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    FilmsComponent,
    TruncateTextPipe,
    DialogInfoComponent,
    CommonTableComponent,
    StarshipsComponent,
    PeopleComponent,
  ],
  entryComponents: [
    DialogInfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    SWResourceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
