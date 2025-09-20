import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Widget } from '../../utils/widget/widget';
import { DashboardWidget } from '../../services/dashboard-widget';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, Widget],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  providers: [DashboardWidget],
})
export class Dashboard {
  store = inject(DashboardWidget);
}
