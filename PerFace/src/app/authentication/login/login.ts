import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      address: [''],
      select: [''],
    });
  }

  login() {
    this.router.navigate(['/dashboard']);
  }

  onSubmit() {
    if (this.form.valid) {
      this.router.navigate(['/dashboard']);
    } else {
      console.log('invalid submission', this.form.value);
    }
  }
}
