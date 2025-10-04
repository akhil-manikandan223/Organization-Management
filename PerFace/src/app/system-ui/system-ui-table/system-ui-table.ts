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
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { SnackbarNotification } from '../../shared/snackbar-notification';
import { HttpErrorResponse } from '@angular/common/http';

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

  pageIcon: string = '';
  pageTitle: string = '';

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbarService: SnackbarNotification
  ) {}

  ngOnInit() {
    this.filteredData = this.data;
    this.dataSource.data = this.filteredData;
    this.selectedStatus = this.config.filters?.defaultStatus || 'all';
    this.applyStatusFilter();

    this.setPageTitle();
    this.setPageIcon();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => ({
          title: this.getRouteTitle(),
          icon: this.getRouteIcon(),
        }))
      )
      .subscribe(({ title, icon }) => {
        this.pageTitle = title || '';
        this.pageIcon = icon || '';
      });
  }

  ngOnChanges() {
    if (this.data && Array.isArray(this.data)) {
      this.filteredData = [...this.data];
      this.applyStatusFilter();
      this.applyCurrentFilter();
      this.selection.clear();
      this.dataSource.data = this.filteredData;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 20;
  }

  trackById(index: number, item: any) {
    return item[this.config.idField] || index;
  }

  private setPageTitle(): void {
    this.pageTitle = this.getRouteTitle() || '';
  }

  private setPageIcon(): void {
    this.pageIcon = this.getRouteIcon() || '';
  }

  private getRouteTitle(): string {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    if (route.snapshot.data['title']) {
      return route.snapshot.data['title'];
    }

    if (route.snapshot.title) {
      return route.snapshot.title;
    }

    let parent = route.parent;
    while (parent) {
      if (parent.snapshot.data['title']) {
        return parent.snapshot.data['title'];
      }
      if (parent.snapshot.title) {
        return parent.snapshot.title;
      }
      parent = parent.parent;
    }

    return '';
  }

  private getRouteIcon(): string {
    let route = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    if (route.snapshot.data['iconClass']) {
      return route.snapshot.data['iconClass'];
    }

    let parent = route.parent;
    while (parent) {
      if (parent.snapshot.data['iconClass']) {
        return parent.snapshot.data['iconClass'];
      }
      parent = parent.parent;
    }

    return '';
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

      console.log('Edit clicked!');
      console.log('Element:', element);
      console.log('ID extracted:', id);
      console.log('Edit route:', this.config.editRoute);
      console.log('Full route will be:', `${this.config.editRoute}/${id}`);

      this.router.navigate([this.config.editRoute, id]).then(
        (success) => {
          console.log('Navigation success:', success);
        },
        (error) => {
          console.error('Navigation failed:', error);
        }
      );
    } else {
      console.warn('Edit route not configured in table config');
      this.snackbarService.showError('Edit functionality not available');
    }
  }

  handleDelete(element: any) {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Delete',
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
      this.snackbarService.showError('Service not configured properly');
      return;
    }

    const methodName = this.config.deleteMethodName || 'deleteById';
    const deleteMethod = this.config.service[methodName];

    if (typeof deleteMethod !== 'function') {
      this.snackbarService.showError(
        `Delete method '${methodName}' not found in service`
      );
      console.error(`Method ${methodName} not found in service`);
      return;
    }

    deleteMethod.call(this.config.service, id).subscribe({
      next: (response: any) => {
        const itemName =
          element?.name || element?.roleName || element?.firstName || 'Item';
        this.snackbarService.showSuccess(`${itemName} deleted successfully`);

        const updatedData = this.data.filter(
          (item) => item[this.config.idField] !== id
        );
        this.dataChanged.emit(updatedData);
      },
      error: (error: HttpErrorResponse) => {
        this.handleDeleteError(error, 'delete');
      },
    });
  }

  bulkDeleteItems(ids: any[]) {
    if (!this.config.service) {
      this.snackbarService.showError('Service not configured properly');
      return;
    }

    const methodName = this.config.bulkDeleteMethodName || 'deleteMultiple';
    const bulkDeleteMethod = this.config.service[methodName];

    if (typeof bulkDeleteMethod !== 'function') {
      this.snackbarService.showError(
        `Bulk delete method '${methodName}' not found in service`
      );
      console.error(`Method ${methodName} not found in service`);
      return;
    }

    bulkDeleteMethod.call(this.config.service, ids).subscribe({
      next: (response: any) => {
        this.snackbarService.showSuccess(
          `${ids.length} item(s) deleted successfully`
        );

        const updatedData = this.data.filter(
          (item) => !ids.includes(item[this.config.idField])
        );
        this.selection.clear();
        this.dataChanged.emit(updatedData);
      },
      error: (error: HttpErrorResponse) => {
        this.handleDeleteError(error, 'bulk delete');
      },
    });
  }

  private handleDeleteError(error: HttpErrorResponse, operation: string) {
    let errorMessage = `Failed to ${operation} item(s)`;

    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      if (error.status === 400) {
        errorMessage =
          error.error?.message || 'Bad request - please check your data';
      } else if (error.status === 404) {
        errorMessage = 'Item not found';
      } else if (error.status === 500) {
        errorMessage = 'Server error occurred';
      } else {
        errorMessage = `Network error: ${error.statusText}`;
      }
    }

    this.snackbarService.showError(errorMessage);

    console.error(`Error during ${operation}:`, {
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      errorBody: error.error,
      fullError: error,
    });

    if (
      error.error?.rolesWithActiveUsers &&
      Array.isArray(error.error.rolesWithActiveUsers)
    ) {
      const details = error.error.rolesWithActiveUsers.join(', ');
      setTimeout(() => {
        this.snackbarService.showError(`Details: ${details}`);
      }, 3000);
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
