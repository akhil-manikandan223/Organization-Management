import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SnackbarNotification } from '../../shared/snackbar-notification';
import { AuthService } from '../../services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
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

  goToRegisterUser() {
    this.router.navigate(['/register']);
  }
}
