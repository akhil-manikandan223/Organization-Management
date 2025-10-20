import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../../../models/AppCountries/countries';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  fetchAllCountries(): Observable<Country[]> {
    const url = `${this.baseUrl}Country/GetAllCountries`;
    return this.http.get<Country[]>(url);
  }

  createCountry(country: Country): Observable<Country> {
    const url = `${this.baseUrl}Country/CreateNewCountry`;
    return this.http.post<Country>(url, country);
  }

  deleteCountryById(id: number): Observable<any> {
    const url = `${this.baseUrl}Department/DeleteDepartment/${id}`;
    return this.http.delete<any>(url);
  }

  deleteMultipleCountries(countryIds: number[]): Observable<any> {
    const url = `${this.baseUrl}Department/DeleteMultipleDepartments`;
    return this.http.delete<any>(url, { body: countryIds });
  }

  getCountryById(id: number): Observable<Country> {
    const url = `${this.baseUrl}Country/GetCountryById/${id}`;
    return this.http.get<Country>(url);
  }
}
