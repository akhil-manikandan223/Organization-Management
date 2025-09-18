import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {Login} from './login/login';
import {Register} from './register/register';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: '', component: Login },
  { path: 'register', component: Register }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class AuthenticationModule { }
