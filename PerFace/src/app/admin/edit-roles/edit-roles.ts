import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/roles/roles';
import { SnackbarNotification } from '../../shared/snackbar-notification';

@Component({
  selector: 'app-edit-roles',
  imports: [],
  templateUrl: './edit-roles.html',
  styleUrl: './edit-roles.scss',
})
export class EditRoles implements OnInit {
  roleId!: number;

  constructor(
    private route: ActivatedRoute,
    private roleService: RoleService,
    private router: Router,
    private snackbarService: SnackbarNotification
  ) {}

  ngOnInit() {
    console.log('EditRoles component initialized');

    // Add error handling for invalid ID
    const idParam = this.route.snapshot.paramMap.get('id');
    console.log('ID param from route:', idParam);

    if (idParam) {
      this.roleId = +idParam;
      if (isNaN(this.roleId) || this.roleId <= 0) {
        console.error('Invalid role ID:', idParam);
        this.snackbarService.showError('Invalid role ID');
        this.router.navigate(['/roles']);
        return;
      }
      this.loadRoleData();
    } else {
      console.error('No ID parameter found in route');
      this.snackbarService.showError('Role ID not provided');
      this.router.navigate(['/roles']);
    }
  }

  loadRoleData() {
    console.log('Loading role data for ID:', this.roleId);

    this.roleService.fetchRoleById(this.roleId).subscribe({
      next: (role) => {
        console.log('Role data loaded:', role);
      },
      error: (error) => {
        console.error('Error loading role:', error);
        this.snackbarService.showError('Failed to load role data');
      },
    });
  }
}
