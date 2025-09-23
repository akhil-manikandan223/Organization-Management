import { Component, computed, effect, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../material.module';
import { CustomSidenav } from '../custom-sidenav/custom-sidenav';
import { SnackbarNotification } from '../shared/snackbar-notification';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../shared/confirm-dialog.component';

@Component({
  selector: 'app-layout-wrapper',
  imports: [RouterOutlet, MaterialModule, CustomSidenav],
  templateUrl: './layout-wrapper.html',
  styleUrl: './layout-wrapper.scss',
})
export class LayoutWrapper {
  collapsed = signal(false);
  darkMode = signal(false);

  setDarkMode = effect(() => {
    document.documentElement.classList.toggle('dark', this.darkMode());
  });

  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px'));

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackbarNotification: SnackbarNotification
  ) {}

  logout() {
    localStorage.removeItem('loggedInUserData');
    this.snackbarNotification.showSuccess('Logged out');
    this.router.navigate(['/login']);
  }

  openConfirmDialog() {
    const dialogData: ConfirmDialogData = {
      title: 'Logout Confirmation',
      message: 'Are you sure you want to logout?',
      cancelLabel: 'No',
      confirmLabel: 'Yes, Logout',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.logout();
      }
    });
  }
}
