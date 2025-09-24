import { Component, OnInit } from '@angular/core';
import {
  SystemUITableComponent,
  TableConfig,
} from '../../system-ui/system-ui-table/system-ui-table';
import { ColumnDef } from '../../system-ui/system-ui-table/system-ui-table';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { UserProfile } from '../../../models/AppUsers/user-profiles';
import { UserProfileService } from '../../services/user-profiles/user-profile';

@Component({
  selector: 'app-teams',
  imports: [MaterialModule, SystemUITableComponent, CommonModule],
  templateUrl: './teams.html',
  styleUrl: './teams.scss',
})
export class Teams implements OnInit {
  allUsers: UserProfile[] = [];
  filterValue = '';
  filteredUsers: UserProfile[] = [];

  columns: ColumnDef[] = [
    { columnDef: 'firstName', header: 'First Name' },
    { columnDef: 'lastName', header: 'Last Name' },
    { columnDef: 'phone', header: 'Phone' },
    { columnDef: 'email', header: 'Email' },
    { columnDef: 'addressLine1', header: 'Address 1' },
    { columnDef: 'city', header: 'City' },
    { columnDef: 'createdDate', header: 'Created Date' },
  ];

  tableConfig!: TableConfig;

  constructor(private userProfileService: UserProfileService) {
    this.tableConfig = {
      deleteEndpoint: 'UserProfile/DeleteUser',
      bulkDeleteEndpoint: 'UserProfile/DeleteMultipleUsers',
      editRoute: '/edit-user',
      idField: 'userId',
      service: this.userProfileService,
    };
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userProfileService.fetchAllUser().subscribe((response) => {
      this.allUsers = response;
    });
  }

  onDataChanged(updatedData: any[]) {
    this.allUsers = updatedData;
  }
}
