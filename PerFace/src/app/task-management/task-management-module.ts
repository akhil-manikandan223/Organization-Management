import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Projects } from './projects/projects';
import { Tasks } from './tasks/tasks';
import { Tracking } from './tracking/tracking';

const routes: Routes = [
  { path: 'projects', component: Projects, data: { title: 'Projects' } },
  { path: 'tasks', component: Tasks, data: { title: 'Tasks' } },
  { path: 'tracking', component: Tracking, data: { title: 'Tracker' } },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class TaskManagementModule {}
