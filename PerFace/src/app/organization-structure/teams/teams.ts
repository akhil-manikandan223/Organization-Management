import { Component, OnInit } from '@angular/core';
import { SystemUITableComponent } from '../../system-ui/system-ui-table/system-ui-table.component';
import { ColumnDef } from '../../system-ui/system-ui-table/system-ui-table.component';
import { MaterialModule } from '../../material.module';
import { UserProfile } from '../../services/user-profiles/user-profile';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teams',
  imports: [MaterialModule, SystemUITableComponent, CommonModule],
  templateUrl: './teams.html',
  styleUrl: './teams.scss',
})
export class Teams implements OnInit {
  allUsers: UserProfile[] = [];

  columns: ColumnDef[] = [
    { columnDef: 'firstName', header: 'First Name' },
    { columnDef: 'lastName', header: 'Last Name' },
    { columnDef: 'phone', header: 'Phone' },
    { columnDef: 'email', header: 'Email' },
    { columnDef: 'addressLine1', header: 'Address 1' },
    { columnDef: 'city', header: 'City' },
    { columnDef: 'createdDate', header: 'Created Date' },
  ];

  constructor(private userProfileService: UserProfile) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userProfileService.fetchAllUser().subscribe((response) => {
      this.allUsers = response;
      console.log('all users', this.allUsers);
    });
  }
}
