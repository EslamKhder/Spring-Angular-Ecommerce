import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Country} from "../../model/country";
import {State} from "../../model/state";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FormdataService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) {}

  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {

    // search url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }
  getCreditCardMonth(startMonth: number): Observable<number []>{
    let dataNumber: number [] = [];
    for(let date = startMonth;date <= 12;date++){
      dataNumber.push(date);
    }
    return of(dataNumber);
  }
  getCreditCardYear(): Observable<number []>{
    let dataYear: number [] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for(let years = startYear;years <= endYear;years++){
      dataYear.push(years);
    }
    return of(dataYear);
  }

}
interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}
