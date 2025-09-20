import { computed, effect, Injectable, signal } from '@angular/core';
import { Widgets } from '../models/dashboard';
import { Subscribers } from '../home/dashboard/subscribers/subscribers';
import { Views } from '../home/dashboard/views/views';
import { WatchTime } from '../home/dashboard/watch-time/watch-time';
import { Revenue } from '../home/dashboard/revenue/revenue';

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
