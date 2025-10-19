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

  createUser(userProfile: UserProfile): Observable<UserProfile> {
    const url = `${this.baseUrl}UserProfile/CreateNewUser`;
    return this.http.post<UserProfile>(url, userProfile);
  }

  deleteUserById(id: number): Observable<any> {
    const url = `${this.baseUrl}UserProfile/DeleteUser/${id}`;
    return this.http.delete<any>(url);
  }

  updateUser(userProfile: UserProfile): Observable<any> {
    const url = `${this.baseUrl}UserProfile/UpdateUser/${userProfile.userId}`;
    return this.http.put<any>(url, userProfile);
  }

  deleteMultipleUsers(userIds: number[]): Observable<any> {
    const url = `${this.baseUrl}UserProfile/DeleteMultipleUsers`;
    return this.http.delete<any>(url, { body: userIds });
  }

  // ✅ CORRECT - Fixed version
  getUserById(id: number): Observable<UserProfile> {
    const url = `${this.baseUrl}UserProfile/GetUserById/${id}`;
    return this.http.get<UserProfile>(url);
  }
}
