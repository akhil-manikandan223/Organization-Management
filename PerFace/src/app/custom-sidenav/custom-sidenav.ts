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
      icon: 'settings',
      label: 'Settings',
      route: 'system/settings',
      subItems: [
        {
          icon: 'play_circle',
          label: 'Play Circle',
          route: 'system/settings',
        },
        {
          icon: 'playlist_play',
          label: 'Playlists',
          route: 'system/settings',
        },
      ],
    },
    {
      icon: 'dashboard',
      label: 'Management',
      route: 'bakery',
    },
  ]);

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '42' : '100'));
}
