import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';
import { SnackbarNotification } from '../../shared/snackbar-notification';

@Component({
  selector: 'app-forgot-password',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  hidePassword = signal(true);

  form: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbarNotification: SnackbarNotification
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.loginUser(this.form.value).subscribe(
        (response) => {
          localStorage.setItem('loggedInUserData', JSON.stringify(response));
          this.snackbarNotification.showSuccess('Logged in successfully!');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this.snackbarNotification.showError('Invalid credentials!');
        }
      );
    } else {
      this.snackbarNotification.showError('Invalid form values');
    }
  }

  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
