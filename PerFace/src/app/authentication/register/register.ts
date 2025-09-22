import { Component } from '@angular/core';
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

@Component({
  selector: 'app-register',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  form: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbarNotification: SnackbarNotification
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: [''],
      postalCode: ['', Validators.required],
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.createNewUser(this.form.value).subscribe((response) => {
        this.snackbarNotification.showSuccess('User created successfully!');
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.snackbarNotification.showError('Failed to register a new user');
    }
  }
}
