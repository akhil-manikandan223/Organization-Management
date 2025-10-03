import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../shared/confirm-dialog.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  ColumnDef,
  FilterStatus,
  TableConfig,
} from '../system-ui-models/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'system-ui-table',
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './system-ui-table.html',
  styleUrl: './system-ui-table.scss',
})
export class SystemUITableComponent {
  @Input() columns: ColumnDef[] = [];
  @Input() data: any[] = [];
  @Input() config!: TableConfig;
  @Output() dataChanged = new EventEmitter<any[]>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<any>([]);

  filterValue = '';
  filteredData: any[] = [];
  selection = new SelectionModel<any>(true, []);

  selectedStatus: FilterStatus = 'active';

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.filteredData = this.data;
    this.dataSource.data = this.filteredData;
    this.selectedStatus = this.config.filters?.defaultStatus || 'all';
    this.applyStatusFilter();
  }

  ngOnChanges() {
    this.filteredData = this.data;
    this.applyCurrentFilter();
    this.applyStatusFilter();
    this.selection.clear();
    this.dataSource.data = this.filteredData;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 20;
  }

  get displayedColumns(): string[] {
    return this.columns.map((c) => c.columnDef);
  }

  get displayedColumnsWithActions(): string[] {
    return [...this.displayedColumns, 'actions'];
  }

  get displayedColumnsWithSelectAndActions(): string[] {
    return ['select', ...this.displayedColumns, 'actions'];
  }

  get showStatusFilter(): boolean {
    return this.config.filters?.showStatusFilter ?? false;
  }

  get showSearchFilter(): boolean {
    return this.config.filters?.showSearchFilter ?? true;
  }

  hasCustomTemplate(column: ColumnDef): boolean {
    return !!column.customTemplate;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.filteredData.length;
    return numSelected === numRows;
  }

  // ADD THIS MISSING METHOD
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.filteredData);
  }

  applyFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    this.filterValue = target.value.trim().toLowerCase();
    this.applyCurrentFilter();
  }

  applyCurrentFilter() {
    let baseData = this.getFilteredDataByStatus();

    if (!this.filterValue) {
      this.filteredData = baseData;
    } else {
      this.filteredData = baseData.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(this.filterValue)
        )
      );
    }
    this.dataSource.data = this.filteredData;
  }

  handleEdit(element: any) {
    if (this.config.editRoute) {
      const id = element[this.config.idField];
      window.location.href = `${this.config.editRoute}/${id}`;
    }
  }

  handleDelete(element: any) {
    const dialogData: ConfirmDialogData = {
      title: 'Delete Confirmation',
      message:
        'Are you sure you want to delete this item? This action cannot be undone.',
      cancelLabel: 'Cancel',
      confirmLabel: 'Delete',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed && this.config.service && this.config.deleteEndpoint) {
        const id = element[this.config.idField];
        this.deleteItem(id, element);
      }
    });
  }

  handleBulkDelete() {
    const selectedItems = this.selection.selected;
    const selectedIds = selectedItems.map((item) => item[this.config.idField]);

    const dialogData: ConfirmDialogData = {
      title: 'Delete Multiple Items',
      message: `Are you sure you want to delete ${selectedItems.length} selected item(s)? This action cannot be undone.`,
      cancelLabel: 'Cancel',
      confirmLabel: 'Delete All',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.bulkDeleteItems(selectedIds);
      }
    });
  }

  deleteItem(id: any, element?: any) {
    if (!this.config.service) {
      return;
    }
    const serviceProps = Object.getOwnPropertyNames(this.config.service);
    const serviceMethods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this.config.service)
    );

    const possibleMethods = ['deleteUserById', 'deleteById', 'delete'];
    let deleteMethod: Function | null = null;
    let methodName = '';

    for (const method of possibleMethods) {
      if (typeof this.config.service[method] === 'function') {
        deleteMethod = this.config.service[method].bind(this.config.service);
        methodName = method;
        break;
      }
    }

    if (!deleteMethod) {
      return;
    }

    deleteMethod(id).subscribe({
      next: (response: any) => {
        const updatedData = this.data.filter(
          (item) => item[this.config.idField] !== id
        );
        this.dataChanged.emit(updatedData);
      },
      error: (error: any) => {
        console.error('Error deleting item:', error);
      },
    });
  }

  bulkDeleteItems(ids: any[]) {
    if (this.config.service.deleteMultipleUsers) {
      this.config.service.deleteMultipleUsers(ids).subscribe({
        next: (response: any) => {
          const updatedData = this.data.filter(
            (item) => !ids.includes(item[this.config.idField])
          );
          this.selection.clear();
          this.dataChanged.emit(updatedData);
        },
        error: (error: any) => {
          console.error('Error bulk deleting items:', error);
        },
      });
    }
  }

  private getFilteredDataByStatus(): any[] {
    switch (this.selectedStatus) {
      case 'active':
        return this.data.filter((item) => item.isActive === true);
      case 'inactive':
        return this.data.filter((item) => item.isActive === false);
      case 'all':
      default:
        return this.data;
    }
  }

  private applyStatusFilter() {
    this.applyCurrentFilter();
  }

  clearFilter() {
    this.filterValue = '';
    this.applyCurrentFilter();
  }

  onStatusChange(event: any) {
    this.selectedStatus = event.value;
    this.applyStatusFilter();
  }
}
