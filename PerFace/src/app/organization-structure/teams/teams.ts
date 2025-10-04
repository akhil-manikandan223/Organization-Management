import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SystemUITableComponent } from '../../system-ui/system-ui-table/system-ui-table';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../../models/AppUsers/user-profiles';
import { UserProfileService } from '../../services/user-profiles/user-profile';
import {
  ColumnDef,
  TableConfig,
} from '../../system-ui/system-ui-models/models';
import { LoadingScreen5 } from '../../utils/loading-screens/loading-screen-5/loading-screen-5';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-teams',
  imports: [
    MaterialModule,
    SystemUITableComponent,
    CommonModule,
    LoadingScreen5,
  ],
  templateUrl: './teams.html',
  styleUrl: './teams.scss',
})
export class Teams implements OnInit {
  allUsers: UserProfile[] = [];
  filterValue = '';
  filteredUsers: UserProfile[] = [];
  @ViewChild('createdDateTemplate') createdDateTemplate!: TemplateRef<any>;
  @ViewChild('isActiveStateTemplate') isActiveStateTemplate!: TemplateRef<any>;
  @ViewChild('userImageTemplate') userImageTemplate!: TemplateRef<any>;

  columns: ColumnDef[] = [];

  tableConfig!: TableConfig;

  constructor(
    private userProfileService: UserProfileService,
    private cdr: ChangeDetectorRef
  ) {
    this.tableConfig = {
      deleteEndpoint: 'UserProfile/DeleteUser',
      bulkDeleteEndpoint: 'UserProfile/DeleteMultipleUsers',
      editRoute: '/employee-management/profile',
      idField: 'userId',
      service: this.userProfileService,
      deleteMethodName: 'deleteUserById',
      bulkDeleteMethodName: 'deleteMultipleUsers',
      filters: {
        showStatusFilter: true,
        defaultStatus: 'active',
        showSearchFilter: true,
      },
    };
  }

  ngOnInit() {
    this.getAllUsers();
  }

  ngAfterViewInit() {
    this.initializeColumns();
  }

  initializeColumns() {
    this.columns = [
      {
        columnDef: 'firstName',
        header: 'First Name',
        sticky: true,
      },
      { columnDef: 'lastName', header: 'Last Name' },
      { columnDef: 'phone', header: 'Phone' },
      { columnDef: 'email', header: 'Email' },
      {
        columnDef: 'isActive',
        header: 'Status',
        customTemplate: this.isActiveStateTemplate,
      },
      { columnDef: 'addressLine1', header: 'Address 1' },
      { columnDef: 'addressLine2', header: 'Address 2' },
      { columnDef: 'city', header: 'City' },
      {
        columnDef: 'createdDate',
        header: 'Created Date',
        customTemplate: this.createdDateTemplate,
      },
    ];
  }

  getAllUsers() {
    this.userProfileService.fetchAllUser().subscribe((response) => {
      this.allUsers = [...response];
      console.log('all roles', this.allUsers);
      this.cdr.detectChanges();
    });
  }

  onDataChanged(updatedData: any[]) {
    this.allUsers = updatedData;
  }
}
