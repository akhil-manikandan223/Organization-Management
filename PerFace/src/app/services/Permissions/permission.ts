import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Permission {
  permissionId: number;
  permissionName: string;
  permissionCode: string;
  description: string;
  module: string;
  isActive: boolean;
  createdDate: string;
  roleCount: number;
  assignedRoles: Array<{
    roleId: number;
    roleName: string;
    description: string;
    assignedDate: string;
  }>;
}

export interface PermissionByModule {
  module: string;
  permissions: Array<{
    permissionId: number;
    permissionName: string;
    permissionCode: string;
    description: string;
    module: string;
    isActive: boolean;
  }>;
}

export interface RolePermission {
  permissionId: number;
  permissionName: string;
  permissionCode: string;
  description: string;
  module: string;
  assignedDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  fetchAllPermissions(
    includeInactive: boolean = false
  ): Observable<Permission[]> {
    const url = `${this.baseUrl}Permission/GetAllPermissions?includeInactive=${includeInactive}`;
    return this.http.get<Permission[]>(url);
  }

  fetchPermissionById(id: number): Observable<Permission> {
    const url = `${this.baseUrl}Permission/GetPermission/${id}`;
    return this.http.get<Permission>(url);
  }

  fetchPermissionsByModule(module?: string): Observable<PermissionByModule[]> {
    const url = `${this.baseUrl}Permission/GetPermissionsByModule${
      module ? `?module=${module}` : ''
    }`;
    return this.http.get<PermissionByModule[]>(url);
  }

  fetchAllModules(): Observable<string[]> {
    const url = `${this.baseUrl}Permission/GetAllModules`;
    return this.http.get<string[]>(url);
  }

  fetchPermissionsForRole(roleId: number): Observable<RolePermission[]> {
    const url = `${this.baseUrl}Permission/GetPermissionsForRole/${roleId}`;
    return this.http.get<RolePermission[]>(url);
  }
}
