import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileManagement } from './profile-management/profile-management';
import { Leave } from './leave/leave';
import { Attendance } from './attendance/attendance';

const routes: Routes = [
  { path: 'profile', component: ProfileManagement },
  { path: 'leave', component: Leave },
  { path: 'attendance', component: Attendance },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class EmployeeManagementModule {}
