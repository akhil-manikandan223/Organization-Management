import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, forkJoin, takeUntil } from 'rxjs';

// Services & Models
import {
  Role,
  RoleService,
  RoleUser,
  UpdateRoleDto,
} from '../../services/roles/roles';
import {
  Permission,
  PermissionService,
} from '../../services/Permissions/permission';
import { SnackbarNotification } from '../../shared/snackbar-notification';

// Components & Modules
import { MaterialModule } from '../../material.module';
import { LoadingScreen5 } from '../../utils/loading-screens/loading-screen-5/loading-screen-5';

interface ModuleGroup {
  module: string;
  permissions: Permission[];
}

@Component({
  selector: 'app-edit-roles',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    LoadingScreen5,
  ],
  templateUrl: './edit-roles.html',
  styleUrl: './edit-roles.scss',
})
export class EditRoles implements OnInit, OnDestroy {
  // Component State
  readonly roleId: number;

  // Data Properties
  currentRole: Role | null = null;
  usersWithCurrentRole: RoleUser[] = [];
  allPermissions: Permission[] = [];

  // Form
  readonly roleForm: FormGroup;

  // UI State
  selectedPermissionIds = new Set<number>();
  expandedModules = new Set<string>();

  // Loading States
  isLoading = false;
  isSubmitting = false;
  isLoadingPermissions = false;

  // Cleanup
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private readonly snackbarService: SnackbarNotification
  ) {
    // Initialize form
    this.roleForm = this.fb.group({
      roleName: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      isActive: [true],
    });

    // Get and validate role ID
    const idParam = this.route.snapshot.paramMap.get('id');
    this.roleId = this.parseAndValidateRoleId(idParam);
  }

  ngOnInit(): void {
    this.initializeComponent();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ===================
  // INITIALIZATION
  // ===================

  private parseAndValidateRoleId(idParam: string | null): number {
    if (!idParam) {
      this.handleNavigationError('Role ID not provided');
      return 0;
    }

    const id = +idParam;
    if (isNaN(id) || id <= 0) {
      this.handleNavigationError('Invalid role ID');
      return 0;
    }

    return id;
  }

  private handleNavigationError(message: string): void {
    this.snackbarService.showError(message);
    this.router.navigate(['/admin/roles']);
  }

  private initializeComponent(): void {
    if (this.roleId > 0) {
      this.loadData();
    }
  }

  // ===================
  // DATA LOADING
  // ===================

  private loadData(): void {
    this.isLoading = true;
    this.isLoadingPermissions = true;
    this.cdr.detectChanges();

    // Load role data and permissions in parallel
    forkJoin({
      role: this.roleService.fetchRoleById(this.roleId),
      permissions: this.permissionService.fetchAllPermissions(),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ role, permissions }) => {
          this.handleDataLoaded(role, permissions);
        },
        error: (error) => {
          this.handleDataError(error);
        },
      });
  }

  private handleDataLoaded(role: Role, permissions: Permission[]): void {
    // Set role data
    this.currentRole = role;
    this.usersWithCurrentRole = role.users;

    // Set permissions data
    this.allPermissions = permissions;

    // Initialize selected permissions from role
    this.selectedPermissionIds = new Set(
      role.permissions.map((p) => p.permissionId)
    );

    // Expand all modules by default
    this.initializeExpandedModules();

    // Patch form with role data
    this.patchFormData(role);

    // Update loading states
    this.isLoading = false;
    this.isLoadingPermissions = false;
    this.cdr.detectChanges();

    console.log('Data loaded successfully:', { role, permissions });
  }

  private handleDataError(error: any): void {
    console.error('Error loading data:', error);
    this.snackbarService.showError('Failed to load role data');
    this.isLoading = false;
    this.isLoadingPermissions = false;
    this.cdr.detectChanges();
  }

  private initializeExpandedModules(): void {
    const modules = [...new Set(this.allPermissions.map((p) => p.module))];
    this.expandedModules = new Set(modules);
  }

  private patchFormData(role: Role): void {
    this.roleForm.patchValue({
      roleName: role.roleName,
      description: role.description || '',
      isActive: role.isActive,
    });
  }

  getToggleClass(): string {
    return this.roleForm.get('isActive')?.value
      ? 'toggle-active'
      : 'toggle-inactive';
  }

  // ===================
  // PERMISSION LOGIC
  // ===================

  getPermissionsByModule(): ModuleGroup[] {
    const grouped = this.allPermissions.reduce((acc, permission) => {
      const module = permission.module;
      if (!acc[module]) {
        acc[module] = [];
      }
      acc[module].push(permission);
      return acc;
    }, {} as Record<string, Permission[]>);

    return Object.keys(grouped)
      .sort()
      .map((module) => ({
        module,
        permissions: grouped[module].sort((a, b) =>
          a.permissionName.localeCompare(b.permissionName)
        ),
      }));
  }

  // ===================
  // PERMISSION SELECTION
  // ===================

  isPermissionSelected(permissionId: number): boolean {
    return this.selectedPermissionIds.has(permissionId);
  }

  onPermissionToggle(permissionId: number, isChecked: boolean): void {
    if (isChecked) {
      this.selectedPermissionIds.add(permissionId);
    } else {
      this.selectedPermissionIds.delete(permissionId);
    }
  }

  // Grant All Permissions
  areAllPermissionsSelected(): boolean {
    return (
      this.allPermissions.length > 0 &&
      this.selectedPermissionIds.size === this.allPermissions.length
    );
  }

  areSomePermissionsSelected(): boolean {
    return (
      this.selectedPermissionIds.size > 0 &&
      this.selectedPermissionIds.size < this.allPermissions.length
    );
  }

  onGrantAllToggle(isChecked: boolean): void {
    if (isChecked) {
      this.selectAllPermissions();
    } else {
      this.deselectAllPermissions();
    }
  }

  selectAllPermissions(): void {
    this.allPermissions.forEach((p) =>
      this.selectedPermissionIds.add(p.permissionId)
    );
    this.cdr.detectChanges();
  }

  deselectAllPermissions(): void {
    this.selectedPermissionIds.clear();
    this.cdr.detectChanges();
  }

  // Module-level Selection
  areAllModulePermissionsSelected(module: string): boolean {
    const modulePermissions = this.getModulePermissions(module);
    return (
      modulePermissions.length > 0 &&
      modulePermissions.every((p) =>
        this.selectedPermissionIds.has(p.permissionId)
      )
    );
  }

  areSomeModulePermissionsSelected(module: string): boolean {
    const modulePermissions = this.getModulePermissions(module);
    const selectedCount = modulePermissions.filter((p) =>
      this.selectedPermissionIds.has(p.permissionId)
    ).length;
    return selectedCount > 0 && selectedCount < modulePermissions.length;
  }

  onModuleSelectAllToggle(module: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectAllInModule(module);
    } else {
      this.deselectAllInModule(module);
    }
  }

  selectAllInModule(module: string): void {
    this.getModulePermissions(module).forEach((p) =>
      this.selectedPermissionIds.add(p.permissionId)
    );
    this.cdr.detectChanges();
  }

  deselectAllInModule(module: string): void {
    this.getModulePermissions(module).forEach((p) =>
      this.selectedPermissionIds.delete(p.permissionId)
    );
    this.cdr.detectChanges();
  }

  private getModulePermissions(module: string): Permission[] {
    return this.allPermissions.filter((p) => p.module === module);
  }

  // ===================
  // MODULE EXPANSION
  // ===================

  isModuleExpanded(module: string): boolean {
    return this.expandedModules.has(module);
  }

  toggleModuleExpansion(module: string): void {
    if (this.expandedModules.has(module)) {
      this.expandedModules.delete(module);
    } else {
      this.expandedModules.add(module);
    }
  }

  // ===================
  // STATISTICS
  // ===================

  getSelectedPermissionsCount(): number {
    return this.selectedPermissionIds.size;
  }

  getSelectedCountForModule(module: string): number {
    return this.getModulePermissions(module).filter((p) =>
      this.selectedPermissionIds.has(p.permissionId)
    ).length;
  }

  // ===================
  // FORM HANDLING
  // ===================

  onSubmit(): void {
    if (!this.roleForm.valid) {
      this.markFormGroupTouched();
      return;
    }

    this.isSubmitting = true;

    const updateData: UpdateRoleDto = {
      roleName: this.roleForm.value.roleName.trim(),
      description: this.roleForm.value.description?.trim() || '',
      isActive: this.roleForm.value.isActive,
      permissionIds: Array.from(this.selectedPermissionIds),
    };

    this.roleService
      .updateRole(this.roleId, updateData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.snackbarService.showSuccess('Role updated successfully');
          this.router.navigate(['/admin/roles']);
        },
        error: (error) => {
          console.error('Error updating role:', error);
          this.snackbarService.showError('Failed to update role');
          this.isSubmitting = false;
          this.cdr.detectChanges();
        },
      });
  }

  onCancel(): void {
    this.router.navigate(['/admin/roles']);
  }

  // ===================
  // FORM VALIDATION
  // ===================

  private markFormGroupTouched(): void {
    Object.keys(this.roleForm.controls).forEach((key) => {
      this.roleForm.get(key)?.markAsTouched();
    });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.roleForm.get(fieldName);

    if (control?.hasError('required')) {
      return `${this.capitalizeFieldName(fieldName)} is required`;
    }

    if (control?.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `${this.capitalizeFieldName(
        fieldName
      )} cannot exceed ${maxLength} characters`;
    }

    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.roleForm.get(fieldName);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  private capitalizeFieldName(fieldName: string): string {
    return (
      fieldName.charAt(0).toUpperCase() +
      fieldName.slice(1).replace(/([A-Z])/g, ' $1')
    );
  }
}
