import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarNotification {
  private defaultConfig: MatSnackBarConfig = {
    duration: 2500,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', this.defaultConfig);
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      ...this.defaultConfig,
      panelClass: ['snackbar-error'],
    });
  }
}
