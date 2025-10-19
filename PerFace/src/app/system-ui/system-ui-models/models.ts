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
  deleteEndpoint: string;
  bulkDeleteEndpoint: string;
  editRoute: string;
  idField: string;
  service: any;
  deleteMethodName?: string;
  bulkDeleteMethodName?: string;
  filters?: {
    showStatusFilter?: boolean;
    defaultStatus?: FilterStatus;
    showSearchFilter?: boolean;
  };
}

export type FilterStatus = 'all' | 'active' | 'inactive';

// models/edit-field-config.model.ts
export interface EditFieldConfig {
  key: string; // Property name from DTO
  label: string; // Display label
  type: EditFieldType; // Field type
  required?: boolean; // Validation
  placeholder?: string; // Input placeholder
  options?: { label: string; value: any }[]; // For dropdowns
  validators?: any[]; // Custom validators
  section?: string; // Group fields by section
  colspan?: number; // Grid layout support
}

export type EditFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'date'
  | 'datetime-local'
  | 'select'
  | 'multiselect'
  | 'textarea'
  | 'checkbox'
  | 'file';

export interface EditComponentConfig {
  fields: EditFieldConfig[];
  title?: string;
  submitText?: string;
  cancelRoute?: string;
  sections?: string[]; // Define section order
  layout?: 'single' | 'two-column' | 'sections';
}
