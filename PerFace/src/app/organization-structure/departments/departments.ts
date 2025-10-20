import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { LoadingScreen5 } from '../../utils/loading-screens/loading-screen-5/loading-screen-5';
import { DepartmentService } from '../../services/departments/department';
import { Department } from '../../../models/AppDepartments/department';
import { SystemUITableComponent } from '../../system-ui/system-ui-table/system-ui-table';
import { ColumnDef, TableConfig } from '../../system-ui/system-ui-models/models';

@Component({
  selector: 'app-departments',
  imports: [MaterialModule, CommonModule, LoadingScreen5, SystemUITableComponent],
  templateUrl: './departments.html',
  styleUrl: './departments.scss'
})
export class Departments implements OnInit {

  @ViewChild('isActiveStateTemplate') isActiveStateTemplate!: TemplateRef<any>;

  allDepartments: Department[] = [];
  columns: ColumnDef[] = [];

  tableConfig!: TableConfig;
  constructor(private departmentService: DepartmentService, private cdr: ChangeDetectorRef) {
    this.tableConfig = {
      deleteEndpoint: 'Department/DeleteDepartment',
      bulkDeleteEndpoint: 'Department/DeleteMultipleDepartments',
      editRoute: '/employee-management/profile',
      idField: 'departmentId',
      service: this.departmentService,
      deleteMethodName: 'deleteDepartmentById',
      bulkDeleteMethodName: 'deleteMultipleDepartments',
      filters: {
        showStatusFilter: true,
        defaultStatus: 'active',
        showSearchFilter: true,
      },
    };
  }

  ngOnInit() {
    this.getAllDepartments();
  }

  ngAfterViewInit() {
    this.initializeColumns();
  }

  initializeColumns() {
    this.columns = [
      {
        columnDef: 'name',
        header: 'Department Name',
        sticky: true,
      },
      {
        columnDef: 'isActive',
        header: 'Status',
        customTemplate: this.isActiveStateTemplate,
      },
    ];
  }

  getAllDepartments() {
    this.departmentService.fetchAllDepartments().subscribe((response) => {
      this.allDepartments = [...response];
      console.log('all roles', this.allDepartments);
      this.cdr.detectChanges();
    });
  }

  onDataChanged(updatedData: any[]) {
    this.allDepartments = updatedData;
  }
}
