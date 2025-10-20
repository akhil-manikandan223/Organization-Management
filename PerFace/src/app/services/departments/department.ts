import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Department } from '../../../models/AppDepartments/department';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  fetchAllDepartments(): Observable<Department[]> {
    const url = `${this.baseUrl}Department/GetAllDepartments`;
    return this.http.get<Department[]>(url);
  }

  createDepartment(department: Department): Observable<Department> {
    const url = `${this.baseUrl}Department/CreateNewDepartment`;
    return this.http.post<Department>(url, department);
  }

  deleteDepartmentById(id: number): Observable<any> {
    const url = `${this.baseUrl}Department/DeleteDepartment/${id}`;
    return this.http.delete<any>(url);
  }

  deleteMultipleDepartments(departmentIds: number[]): Observable<any> {
    const url = `${this.baseUrl}Department/DeleteMultipleDepartments`;
    return this.http.delete<any>(url, { body: departmentIds });
  }
}
