import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Reports } from './reports/reports';
import { Metrics } from './metrics/metrics';

const routes: Routes = [
  { path: 'reports', component: Reports, data: { title: 'Reports' } },
  { path: 'metrics', component: Metrics, data: { title: 'Metrics' } },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class ReportsAnalyticsModule {}
