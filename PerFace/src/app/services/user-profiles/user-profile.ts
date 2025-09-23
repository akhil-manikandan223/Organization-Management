import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserProfile {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  fetchAllUser(): Observable<UserProfile[]> {
    const url = `${this.baseUrl}UserProfile/GetAllUsers`;
    return this.http.get<UserProfile[]>(url);
  }
}
