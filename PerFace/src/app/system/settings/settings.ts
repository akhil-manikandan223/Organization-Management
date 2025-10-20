import { Component } from '@angular/core';
import { MaterialModule } from "../../material.module";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../custom-sidenav/custom-sidenav';

@Component({
  selector: 'app-settings',
  imports: [MaterialModule, CommonModule, RouterModule],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {
  menuItems: MenuItem[] = [
    {
      label: 'Country',
      route: 'country',
      icon: 'south_america'
    },
    {
      label: 'States & Provinces',
      route: 'states-provinces',
      icon: 'location_city'
    },
    {
      label: 'Cities',
      route: 'cities',
      icon: 'location_on'
    },
    {
      label: 'Departments',
      route: 'departments',
      icon: 'domain'
    },
    {
      label: 'Currencies',
      route: 'currencies',
      icon: 'attach_money'
    },
    {
      label: 'Languages',
      route: 'languages',
      icon: 'language'
    },
    {
      label: 'Time Zones',
      route: 'time-zones',
      icon: 'schedule'
    }
  ];

  constructor() {}

  onMenuItemClick(item: MenuItem) {
    console.log('Clicked on:', item.label);
    // You can add custom logic here
  }

  addMenuItem(newItem: MenuItem) {
    this.menuItems.push(newItem);
  }

  removeMenuItem(route: string) {
    this.menuItems = this.menuItems.filter(item => item.route !== route);
  }
}
