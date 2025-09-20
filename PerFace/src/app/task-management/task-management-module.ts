import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Projects } from './projects/projects';
import { Tasks } from './tasks/tasks';
import { Tracking } from './tracking/tracking';

const routes: Routes = [
  // { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: Projects },
  { path: 'tasks', component: Tasks },
  { path: 'tracking', component: Tracking },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class TaskManagementModule {}
