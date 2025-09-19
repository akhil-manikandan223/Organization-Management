import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Settings } from './settings/settings';

const routes: Routes = [
  { path: 'settings', component: Settings },
  { path: '', component: Settings },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class SystemModule {}
