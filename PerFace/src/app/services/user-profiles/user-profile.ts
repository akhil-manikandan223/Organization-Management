import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserProfile } from '../../../models/AppUsers/user-profiles';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  fetchAllUser(): Observable<UserProfile[]> {
    const url = `${this.baseUrl}UserProfile/GetAllUsers`;
    return this.http.get<UserProfile[]>(url);
  }

  deleteUserById(id: number): Observable<any> {
    const url = `${this.baseUrl}UserProfile/DeleteUser/${id}`;
    return this.http.delete<any>(url);
  }

  deleteMultipleUsers(userIds: number[]): Observable<any> {
    const url = `${this.baseUrl}UserProfile/DeleteMultipleUsers`;
    return this.http.delete<any>(url, { body: userIds });
  }
}
