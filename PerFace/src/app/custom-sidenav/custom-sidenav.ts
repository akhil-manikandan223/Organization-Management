import { Component, computed, Input, signal } from '@angular/core';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
  subItems?: MenuItem[];
};

@Component({
  selector: 'app-custom-sidenav',
  imports: [MaterialModule, RouterModule, MenuItemComponent],
  templateUrl: './custom-sidenav.html',
  styleUrl: './custom-sidenav.scss',
})
export class CustomSidenav {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
    },
    {
      icon: 'moving_ministry',
      label: 'Organization',
      route: 'organization-structure',
      subItems: [
        {
          icon: 'category_search',
          label: 'Departments',
          route: 'departments',
        },
        {
          icon: 'location_on',
          label: 'Locations',
          route: 'locations',
        },
        {
          icon: 'groups',
          label: 'Teams',
          route: 'teams',
        },
        {
          icon: 'computer',
          label: 'Workspace',
          route: 'workspaces',
        },
      ],
    },
    {
      icon: 'reduce_capacity',
      label: 'People',
      route: 'employee-management',
      subItems: [
        {
          icon: 'check_in_out',
          label: 'Attendance',
          route: 'attendance',
        },
        {
          icon: 'group_remove',
          label: 'Leave',
          route: 'leave',
        },
      ],
    },
    // {
    //   icon: 'task_alt',
    //   label: 'Task Management',
    //   route: 'task-management',
    //   subItems: [
    {
      icon: 'folder',
      label: 'Projects',
      route: 'projects',
    },
    {
      icon: 'assignment',
      label: 'Tasks',
      route: 'tasks',
    },
    {
      icon: 'timer',
      label: 'Time Tracking',
      route: 'tracking',
    },
    //   ],
    // },
    {
      icon: 'bar_chart_4_bars',
      label: 'Analytics',
      route: 'reports-analytics',
      subItems: [
        {
          icon: 'article_shortcut',
          label: 'Reports',
          route: 'reports',
        },
        {
          icon: 'data_usage',
          label: 'Metrics',
          route: 'metrics',
        },
      ],
    },
    {
      icon: 'document_scanner',
      label: 'Saved Documents',
      route: 'documents-management/saved-documents',
    },
    {
      icon: 'settings',
      label: 'Settings',
      route: 'system/settings',
    },
  ]);

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '42' : '100'));
}
