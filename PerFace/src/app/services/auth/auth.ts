import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  createNewUser(userData: any): Observable<any> {
    const url = `${this.baseUrl}UserProfile/CreateNewUser`;
    return this.http.post(url, userData);
  }

  loginUser(loginData: any): Observable<any> {
    const url = `${this.baseUrl}UserProfile/Login`;
    return this.http.post(url, loginData);
  }
}
