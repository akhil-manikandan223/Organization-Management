import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarNotification } from '../../shared/snackbar-notification';
import { AuthService } from '../../services/auth/auth';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-register',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  @ViewChild('stepper') stepper!: MatStepper;

  personalInfoForm: FormGroup;
  contactAddressForm: FormGroup;
  securityForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbarNotification: SnackbarNotification
  ) {
    // Step 1: Personal Information
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
    });

    // Step 2: Contact & Address Information
    this.contactAddressForm = this.fb.group({
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: [''],
      postalCode: ['', Validators.required],
    });

    // Step 3: Security Information
    this.securityForm = this.fb.group({
      password: ['', Validators.required],
    });
  }

  onStepNext(stepNumber: number) {
    if (stepNumber === 1 && this.personalInfoForm.valid) {
      this.stepper.next();
    } else if (stepNumber === 2 && this.contactAddressForm.valid) {
      this.stepper.next();
    } else {
      // Mark all fields as touched to show validation errors
      if (stepNumber === 1) {
        this.personalInfoForm.markAllAsTouched();
      } else if (stepNumber === 2) {
        this.contactAddressForm.markAllAsTouched();
      }
    }
  }

  isAllFormsValid(): boolean {
    return (
      this.personalInfoForm.valid &&
      this.contactAddressForm.valid &&
      this.securityForm.valid
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.isAllFormsValid()) {
      // Combine all form values
      const formData = {
        ...this.personalInfoForm.value,
        ...this.contactAddressForm.value,
        ...this.securityForm.value,
      };

      this.authService.createNewUser(formData).subscribe((response) => {
        this.snackbarNotification.showSuccess('User created successfully!');
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.securityForm.markAllAsTouched();
      this.snackbarNotification.showError(
        'Please complete all required fields'
      );
    }
  }
}
