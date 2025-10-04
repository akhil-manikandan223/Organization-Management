import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserRoles } from './user-roles/user-roles';
import { Permissions } from './permissions/permissions';
import { Roles } from './roles/roles';
import { EditRoles } from './edit-roles/edit-roles';

const routes: Routes = [
  {
    path: 'roles',
    component: Roles,
    data: { title: 'Roles', iconClass: 'assignment_ind' },
  },
  {
    path: 'edit-roles/:id',
    component: EditRoles,
    data: { title: 'Edit Role', iconClass: 'assignment_ind' },
  },
  {
    path: 'user-roles',
    component: UserRoles,
    data: { title: 'User Roles', iconClass: 'add_moderator' },
  },
  {
    path: 'permissions',
    component: Permissions,
    data: { title: 'Permissions', iconClass: 'approval_delegation_off' },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
