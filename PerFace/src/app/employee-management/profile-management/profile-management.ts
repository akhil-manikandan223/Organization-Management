import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { LoadingScreen5 } from '../../utils/loading-screens/loading-screen-5/loading-screen-5';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from '../../services/user-profiles/user-profile';
import { UserEditDto, UserProfile } from '../../../models/AppUsers/user-profiles';

@Component({
  selector: 'app-profile-management',
  imports: [MaterialModule, ReactiveFormsModule, FormsModule, CommonModule, LoadingScreen5],
  templateUrl: './profile-management.html',
  styleUrl: './profile-management.scss'
})
export class ProfileManagement {
  userForm!: FormGroup;
  loading = false;
  userId: number | null = null;
  isEditMode = false;

  userData: UserEditDto | null = null;

  genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
    { value: 'PreferNotToSay', label: 'Prefer not to say' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService: UserProfileService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    // Get user ID from route
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.userId = parseInt(id);
      this.isEditMode = true;
      this.loadUserData();
    }
  }

  private initializeForm() {
    this.userForm = this.fb.group({
      // Basic Information
      userId: [0],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      middleName: ['', Validators.maxLength(50)],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      alternatePhone: [''],
      dateOfBirth: [null],
      gender: [''],

      // Address Information
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      state: [''],
      country: [''],
      postalCode: [''],

      // Employment Information
      department: [''],
      jobTitle: [''],
      employeeId: [''],
      hireDate: [null],
      salary: [null, [Validators.min(0)]],
      manager: [''],

      // Emergency Contact
      emergencyContact: [''],
      emergencyContactPhone: [''],

      // Additional
      profilePicture: [''],
      notes: [''],
      isActive: [true],
      roleIds: [[]]
    });
  }

  private loadUserData() {
    if (!this.userId) return;

    this.loading = true;
    this.userProfileService.getUserById(this.userId).subscribe({
      next: (user: any) => {
        console.log('User data loaded:', user);
        this.userData = user;
        console.log('xxxx:', this.userData);
        // Convert date strings to Date objects
        const userData = {
          ...user,
          dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth) : null,
          hireDate: user.joiningDate ? new Date(user.joiningDate) : null // Note: using joiningDate from your data
        };

        this.userForm.patchValue(userData);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading user data:', error);
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true;
      const formData = this.userForm.value;

      console.log('Form data to save:', formData);

      const saveOperation = this.isEditMode
        ? this.userProfileService.updateUser(formData)
        : this.userProfileService.createUser(formData);

      saveOperation.subscribe({
        next: (response) => {
          console.log('Save successful:', response);
          this.loading = false;
          this.router.navigate(['/employee-management/teams']);
        },
        error: (error) => {
          console.error('Save failed:', error);
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  onCancel() {
    this.router.navigate(['/organization-structure/teams']);
  }

  private markFormGroupTouched() {
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key)?.markAsTouched();
    });
  }

  // Helper method to check if field has error
  hasError(fieldName: string, errorType: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field?.hasError(errorType) && (field?.dirty || field?.touched));
  }

  // Get error message for field
  getErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (field?.hasError('required')) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (field?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (field?.hasError('min')) {
      return 'Value must be greater than 0';
    }
    if (field?.hasError('maxlength')) {
      return `${this.getFieldLabel(fieldName)} is too long`;
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      // Add more as needed
    };
    return labels[fieldName] || fieldName;
  }

  getFullName(): string {
    const firstName = this.userForm.get('firstName')?.value || '';
    const lastName = this.userForm.get('lastName')?.value || '';
    return `${firstName} ${lastName}`.trim() || 'User Name';
  }

  getProfileImage(): string {
    return this.userForm.get('profilePicture')?.value || '/assets/images/sidenav-pro-pic.jpg';
  }

  getYearsOfService(): string {
    const hireDate = this.userForm.get('hireDate')?.value;
    if (hireDate) {
      const years = new Date().getFullYear() - new Date(hireDate).getFullYear();
      return years.toString();
    }
    return '0';
  }

  changeProfilePicture(): void {
    // Implement profile picture change logic
    console.log('Change profile picture clicked');
  }

  viewPublicProfile(): void {
    // Implement view public profile logic
    console.log('View public profile clicked');
  }

  resetPassword(): void {
    // Implement reset password logic
    console.log('Reset password clicked');
  }
}
