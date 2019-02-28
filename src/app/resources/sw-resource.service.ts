import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {appConfig} from "../config";

@Injectable({
  providedIn: 'root'
})
export class SWResourceService {

  constructor(private httpClient: HttpClient) { }

  loadFilms(searchTerm = '', pageIndex = 0): Observable<any> {
    return this.httpClient.get(`${appConfig.apiUrl}/films/`, this._prepareSearchOptions(searchTerm, pageIndex));
  }

  loadStarShips(searchTerm = '', pageIndex = 0): Observable<any> {
    return this.httpClient.get(`${appConfig.apiUrl}/starships/`, this._prepareSearchOptions(searchTerm, pageIndex));
  }

  loadPeople(searchTerm = '', pageIndex = 0): Observable<any> {
    return this.httpClient.get(`${appConfig.apiUrl}/people/`, this._prepareSearchOptions(searchTerm, pageIndex));
  }

  _prepareSearchOptions(searchTerm = '', pageIndex = 0) {
    let params = new HttpParams();
    if (searchTerm) {
      params = params.set('search', searchTerm);
    }
    if (pageIndex) {
      params = params.set('page', (pageIndex + 1).toString());
    }

    return params.keys().length
      ? {params}
      : {};
  }
}
