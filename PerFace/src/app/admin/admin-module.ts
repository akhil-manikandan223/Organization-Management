import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserRoles } from './user-roles/user-roles';
import { Permissions } from './permissions/permissions';

const routes: Routes = [
  { path: 'user-roles', component: UserRoles },
  { path: 'permissions', component: Permissions },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
