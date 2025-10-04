import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Role, RoleService } from '../../services/roles/roles';
import { LoadingScreen5 } from '../../utils/loading-screens/loading-screen-5/loading-screen-5';
import {
  ColumnDef,
  TableConfig,
} from '../../system-ui/system-ui-models/models';
import { CommonModule } from '@angular/common';
import { SystemUITableComponent } from '../../system-ui/system-ui-table/system-ui-table';

@Component({
  selector: 'app-roles',
  imports: [
    MaterialModule,
    LoadingScreen5,
    CommonModule,
    SystemUITableComponent,
  ],
  templateUrl: './roles.html',
  styleUrl: './roles.scss',
})
export class Roles implements OnInit {
  @ViewChild('isActiveStateTemplate') isActiveStateTemplate!: TemplateRef<any>;
  @ViewChild('createdUserTemplate') createdUserTemplate!: TemplateRef<any>;
  allRoles: Role[] = [];
  columns: ColumnDef[] = [];

  tableConfig!: TableConfig;

  constructor(
    private roleService: RoleService,
    private cdr: ChangeDetectorRef
  ) {
    this.tableConfig = {
      deleteEndpoint: 'Role/DeleteRole',
      bulkDeleteEndpoint: 'Role/DeleteMultipleRoles',
      editRoute: '/edit-role',
      idField: 'roleId',
      service: this.roleService,
      deleteMethodName: 'deleteRoleById',
      bulkDeleteMethodName: 'deleteMultipleRoles',
      filters: {
        showStatusFilter: true,
        defaultStatus: 'active',
        showSearchFilter: true,
      },
    };
  }

  ngOnInit(): void {
    this.fetchAllRoles();
  }

  ngAfterViewInit() {
    this.initializeColumns();
  }

  initializeColumns() {
    this.columns = [
      {
        columnDef: 'roleName',
        header: 'Name',
        sticky: true,
      },
      { columnDef: 'description', header: 'Description' },
      {
        columnDef: 'createdByUser',
        header: 'Created By',
        customTemplate: this.createdUserTemplate,
      },
      {
        columnDef: 'isActive',
        header: 'Status',
        customTemplate: this.isActiveStateTemplate,
      },
    ];
  }

  private fetchAllRoles() {
    this.roleService.fetchAllRoles().subscribe((response) => {
      this.allRoles = response;
      this.cdr.detectChanges();
      console.log('all roles', this.allRoles);
    });
  }

  onDataChanged(updatedData: any[]) {
    this.allRoles = updatedData;
  }
}
