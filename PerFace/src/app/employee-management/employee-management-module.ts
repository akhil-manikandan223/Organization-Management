import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileManagement } from './profile-management/profile-management';
import { Leave } from './leave/leave';
import { Attendance } from './attendance/attendance';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileManagement,
    data: { title: 'User Profile' },
  },
  { path: 'leave', component: Leave, data: { title: 'Time Off' } },
  { path: 'attendance', component: Attendance, data: { title: 'Attendance' } },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class EmployeeManagementModule {}
