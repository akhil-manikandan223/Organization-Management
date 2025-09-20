import { Component, inject, input, model } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { Widgets } from '../../../models/dashboard';
import { DashboardWidget } from '../../../services/dashboard-widget';

@Component({
  selector: 'app-widget-options',
  imports: [MaterialModule],
  templateUrl: './widget-options.html',
  styleUrl: './widget-options.scss',
})
export class WidgetOptions {
  data = input.required<Widgets>();
  showOptions = model<boolean>(false);

  store = inject(DashboardWidget);
}
