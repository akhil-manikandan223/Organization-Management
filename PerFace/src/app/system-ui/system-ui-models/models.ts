import { TemplateRef } from '@angular/core';

export interface ColumnDef {
  columnDef: string;
  header: string;
  cell?: (element: any) => string;
  customTemplate?: TemplateRef<any>;
  sticky?: boolean;
  stickyEnd?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}

export interface TableConfig {
  deleteEndpoint?: string;
  bulkDeleteEndpoint?: string;
  editRoute?: string;
  idField: string;
  service?: any;
  filters?: {
    showStatusFilter?: boolean;
    defaultStatus?: FilterStatus; // 'all' | 'active' | 'inactive'
    showSearchFilter?: boolean;
  };
}

export type FilterStatus = 'all' | 'active' | 'inactive';
