import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CustomSidenav } from '../custom-sidenav/custom-sidenav';

@Component({
  selector: 'app-layout-wrapper',
  imports: [RouterOutlet, MaterialModule, CustomSidenav],
  templateUrl: './layout-wrapper.html',
  styleUrl: './layout-wrapper.scss',
})
export class LayoutWrapper {
  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));
}
