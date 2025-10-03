import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

const routes: Routes = [
  { path: 'dashboard', component: Dashboard, data: { title: 'Dashboard' } },
  { path: '', component: Dashboard },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class HomeModule {}
