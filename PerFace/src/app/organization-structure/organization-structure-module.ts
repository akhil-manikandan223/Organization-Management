import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Departments } from './departments/departments';
import { Locations } from './locations/locations';
import { Workspaces } from './workspaces/workspaces';
import { Teams } from './teams/teams';

const routes: Routes = [
  { path: 'departments', component: Departments },
  { path: 'locations', component: Locations },
  { path: 'teams', component: Teams },
  { path: 'workspaces', component: Workspaces },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class OrganizationStructureModule {}
