import { Component, computed, effect, input, signal } from '@angular/core';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../custom-sidenav/custom-sidenav';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-menu-item',
  imports: [MaterialModule, RouterModule],
  animations: [
    trigger('expandeContractMenu', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('500ms ease-in-out', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0, height: 0 })),
      ]),
    ]),
  ],
  templateUrl: './menu-item.html',
  styleUrl: './menu-item.scss',
})
export class MenuItemComponent {
  item = input.required<MenuItem>();
  collapsed = input(false);
  routeHistory = input('');
  nestedMenuOpen = signal(false);

  level = computed(() => this.routeHistory().split('/').length - 1);

  indentation = computed(() =>
    this.collapsed() ? '16px' : `${16 + this.level() * 16}px`
  );

  // logRoutes = effect(() => console.log(this.routeHistory(), this.level()));

  toggleNested() {
    if (!this.item().subItems) return;
    this.nestedMenuOpen.set(!this.nestedMenuOpen());
  }
}
