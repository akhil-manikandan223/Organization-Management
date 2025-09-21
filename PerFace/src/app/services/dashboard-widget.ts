import { computed, effect, Injectable, signal } from '@angular/core';
import { Widgets } from '../models/dashboard';
import { Subscribers } from '../home/dashboard/subscribers/subscribers';
import { Views } from '../home/dashboard/views/views';
import { WatchTime } from '../home/dashboard/watch-time/watch-time';
import { Revenue } from '../home/dashboard/revenue/revenue';
import { Metrics } from '../reports-analytics/metrics/metrics';
import { Departments } from '../organization-structure/departments/departments';
import { Teams } from '../organization-structure/teams/teams';
import { Locations } from '../organization-structure/locations/locations';
import { Workspaces } from '../organization-structure/workspaces/workspaces';

@Injectable()
export class DashboardWidget {
  widgets = signal<Widgets[]>([
    {
      id: 1,
      label: 'Subscribers',
      content: Subscribers,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 2,
      label: 'Views',
      content: Views,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 3,
      label: 'WatchTime',
      content: WatchTime,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 4,
      label: 'Revenue',
      content: Revenue,
      rows: 1,
      columns: 1,
      backgroundColor: '#003f5c',
      color: 'whitesmoke',
    },
    {
      id: 5,
      label: 'Analytics',
      content: Metrics,
      rows: 2,
      columns: 2,
    },
    {
      id: 6,
      label: 'Departments',
      content: Departments,
      rows: 2,
      columns: 1,
    },
    {
      id: 7,
      label: 'Your Team',
      content: Teams,
      rows: 2,
      columns: 1,
    },
    {
      id: 8,
      label: 'Locations',
      content: Locations,
      rows: 1,
      columns: 2,
    },
    {
      id: 9,
      label: 'Your Workspace',
      content: Workspaces,
      rows: 1,
      columns: 2,
    },
  ]);

  addedWidgets = signal<Widgets[]>([]);

  constructor() {
    this.fetchWidgets();
  }

  widgetsToAdd = computed(() => {
    const addedIds = this.addedWidgets().map((w) => w.id);
    return this.widgets().filter((w) => !addedIds.includes(w.id));
  });

  fetchWidgets() {
    const widgetsAsString = localStorage.getItem('dashboardWidgets');
    if (widgetsAsString) {
      const widgets = JSON.parse(widgetsAsString) as Partial<Widgets>[];
      widgets.forEach((widget) => {
        const content = this.widgets().find((w) => w.id === widget.id)?.content;
        if (content) {
          widget.content = content;
        }
      });
      this.addedWidgets.set(widgets as Widgets[]);
    }
  }

  addWidget(w: Widgets) {
    this.addedWidgets.set([...this.addedWidgets(), { ...w }]);
  }

  updateWidget(id: number, widget: Partial<Widgets>) {
    const index = this.addedWidgets().findIndex((w) => w.id === id);
    if (index !== -1) {
      const newWidgets = [...this.addedWidgets()];
      newWidgets[index] = { ...newWidgets[index], ...widget };
      this.addedWidgets.set(newWidgets);
    }
  }

  moveWidgetToRight(id: number) {
    const index = this.addedWidgets().findIndex((w) => w.id === id);
    if (index === this.addedWidgets().length - 1) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index + 1]] = [
      { ...newWidgets[index + 1] },
      { ...newWidgets[index] },
    ];

    this.addedWidgets.set(newWidgets);
  }

  moveWidgetToLeft(id: number) {
    const index = this.addedWidgets().findIndex((w) => w.id === id);
    if (index === 0) {
      return;
    }

    const newWidgets = [...this.addedWidgets()];
    [newWidgets[index], newWidgets[index - 1]] = [
      { ...newWidgets[index - 1] },
      { ...newWidgets[index] },
    ];

    this.addedWidgets.set(newWidgets);
  }

  removeWidget(id: number) {
    this.addedWidgets.set(this.addedWidgets().filter((w) => w.id !== id));
  }

  updateWidgetPosition(sourceWidgetId: number, targetWidgetId: number) {
    const sourceIndex = this.addedWidgets().findIndex(
      (w) => w.id === sourceWidgetId
    );

    if (sourceIndex === -1) return;

    const newWidgets = [...this.addedWidgets()];
    const sourceWidget = newWidgets.splice(sourceIndex, 1)[0];

    const targetIndex = newWidgets.findIndex((w) => w.id === targetWidgetId);
    if (targetIndex === -1) return;

    const insertAt =
      targetIndex === sourceIndex ? targetIndex + 1 : targetIndex;

    newWidgets.splice(insertAt, 0, sourceWidget);
    this.addedWidgets.set(newWidgets);
  }

  saveWidgets = effect(() => {
    const widgetsWithoutContent: Partial<Widgets>[] = this.addedWidgets().map(
      (w) => ({ ...w })
    );
    widgetsWithoutContent.forEach((w) => delete w.content);
    localStorage.setItem(
      'dashboardWidgets',
      JSON.stringify(widgetsWithoutContent)
    );
  });
}
