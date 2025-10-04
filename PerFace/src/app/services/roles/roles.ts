import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Role {
  roleId: number;
  roleName: string;
  description: string;
  isActive: boolean;
  createdDate: string;
  updatedDate?: string;
  createdBy: number;
  createdByUser?: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    fullName: string;
  };
  updatedByUser?: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    fullName: string;
  };
  userCount: number;
  permissions: Permission[];
  users: RoleUser[];
}

export interface Permission {
  permissionId: number;
  permissionName: string;
  permissionCode: string;
  module: string;
  assignedDate: string;
}

export interface RoleUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  assignedDate: string;
}

export interface CreateRoleDto {
  roleName: string;
  description?: string;
  permissionIds?: number[];
  createdBy?: number;
}

export interface UpdateRoleDto {
  roleName: string;
  description?: string;
  isActive: boolean;
  permissionIds?: number[];
  updatedBy?: number;
}

export interface AssignPermissionDto {
  roleId: number;
  permissionId: number;
  assignedBy?: number;
}

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  fetchAllRoles(): Observable<Role[]> {
    const url = `${this.baseUrl}Role/GetAllRoles`;
    return this.http.get<Role[]>(url);
  }

  fetchRoleById(id: number): Observable<Role> {
    const url = `${this.baseUrl}Role/GetRole/${id}`;
    return this.http.get<Role>(url);
  }

  createRole(roleData: CreateRoleDto): Observable<any> {
    const url = `${this.baseUrl}Role/CreateRole`;
    return this.http.post<any>(url, roleData);
  }

  updateRole(id: number, roleData: UpdateRoleDto): Observable<any> {
    const url = `${this.baseUrl}Role/UpdateRole/${id}`;
    return this.http.put<any>(url, roleData);
  }

  deleteRoleById(id: number): Observable<any> {
    const url = `${this.baseUrl}Role/DeleteRole/${id}`;
    return this.http.delete<any>(url);
  }

  getRolePermissions(roleId: number): Observable<Permission[]> {
    const url = `${this.baseUrl}Role/GetRolePermissions/${roleId}`;
    return this.http.get<Permission[]>(url);
  }

  assignPermission(assignData: AssignPermissionDto): Observable<any> {
    const url = `${this.baseUrl}Role/AssignPermission`;
    return this.http.post<any>(url, assignData);
  }

  removePermission(roleId: number, permissionId: number): Observable<any> {
    const url = `${this.baseUrl}Role/RemovePermission/${roleId}/${permissionId}`;
    return this.http.delete<any>(url);
  }

  deleteMultipleRoles(roleIds: number[]): Observable<any> {
    const url = `${this.baseUrl}Role/DeleteMultipleRoles`;
    return this.http.delete<any>(url, { body: roleIds });
  }
}
