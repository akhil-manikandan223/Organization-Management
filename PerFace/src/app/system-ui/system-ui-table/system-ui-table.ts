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
    private activatedRoute: ActivatedRoute
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
      window.location.href = `${this.config.editRoute}/${id}`;
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
