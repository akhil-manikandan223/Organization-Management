import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Departments } from './departments/departments';
import { Locations } from './locations/locations';
import { Workspaces } from './workspaces/workspaces';
import { Teams } from './teams/teams';

const routes: Routes = [
  {
    path: 'departments',
    component: Departments,
    data: { title: 'Departments' },
  },
  { path: 'locations', component: Locations, data: { title: 'Locations' } },
  { path: 'teams', component: Teams, data: { title: 'My Team' } },
  { path: 'workspaces', component: Workspaces, data: { title: 'Workspace' } },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class OrganizationStructureModule {}
