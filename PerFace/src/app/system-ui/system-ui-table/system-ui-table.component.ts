import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';

export interface ColumnDef {
  columnDef: string;
  header: string;
  length?: number;
  cell?: (element: any) => string;
}

@Component({
  selector: 'system-ui-table',
  imports: [MaterialModule, CommonModule],
  template: `
    <table mat-table [dataSource]="data" class="mat-elevation-z8">
      <!-- Dynamic column definitions -->
      @for (column of columns; track column.columnDef) {
      <ng-container [matColumnDef]="column.columnDef">
        <th mat-header-cell *matHeaderCellDef>
          <strong>{{ column.header }}</strong>
        </th>
        <td mat-cell *matCellDef="let element">
          {{ column.cell ? column.cell(element) : element[column.columnDef] }}
        </td>
      </ng-container>
      }

      <!-- Actions column -->
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let element">
          <mat-icon class="edit-icon" (click)="edit(element)">edit</mat-icon>

          <button
            class="delete-icon"
            mat-icon-button
            color="warn"
            (click)="delete(element)"
          >
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumnsWithActions"></tr>
      <tr
        mat-row
        *matRowDef="let row; columns: displayedColumnsWithActions"
      ></tr>
    </table>
  `,
  styles: `
  .edit-icon {
    color: var(--mat-sys-on-primary-container); 
    font-size: 18px; 
    cursor: pointer; 
    margin-top: 6px
}
  .delete-icon {
    color: var(--mat-sys-error); 
    font-size: 18px; 
    cursor: pointer; 
    margin-top: 6px
    }`,
})
export class SystemUITableComponent {
  @Input() columns: ColumnDef[] = [];
  @Input() data: any[] = [];

  get displayedColumns(): string[] {
    return this.columns.map((c) => c.columnDef);
  }

  get displayedColumnsWithActions(): string[] {
    return [...this.displayedColumns, 'actions'];
  }

  edit(element: any) {
    console.log('Edit', element);
  }

  delete(element: any) {
    console.log('Delete', element);
  }
}
