import {
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Widget } from '../../utils/widget/widget';
import { DashboardWidget } from '../../services/dashboard-widget';
import { wrapGrid } from 'animate-css-grid';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dashboard',
  imports: [MaterialModule, Widget, CdkDropList, CdkDropListGroup],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  providers: [DashboardWidget],
})
export class Dashboard implements OnInit {
  store = inject(DashboardWidget);

  dashboard = viewChild.required<ElementRef>('dashboard');

  ngOnInit() {
    wrapGrid(this.dashboard().nativeElement, { duration: 300 });
  }

  drop(event: CdkDragDrop<number, any>) {
    const { previousContainer, container } = event;
    this.store.updateWidgetPosition(previousContainer.data, container.data);
  }
}
