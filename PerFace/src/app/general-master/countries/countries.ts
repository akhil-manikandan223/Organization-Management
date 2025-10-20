import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { LoadingScreen5 } from '../../utils/loading-screens/loading-screen-5/loading-screen-5';
import { CommonModule } from '@angular/common';
import { SystemUITableComponent } from '../../system-ui/system-ui-table/system-ui-table';
import { Country } from '../../../models/AppCountries/countries';
import { ColumnDef, TableConfig } from '../../system-ui/system-ui-models/models';
import { CountryService } from '../../services/countries/country';

@Component({
  selector: 'app-countries',
  imports: [MaterialModule, LoadingScreen5, CommonModule, SystemUITableComponent],
  templateUrl: './countries.html',
  styleUrl: './countries.scss'
})
export class Countries {
  allCountries: Country[] = [];
  @ViewChild('isActiveStateTemplate') isActiveStateTemplate!: TemplateRef<any>;
  @ViewChild('createdDateTemplate') createdDateTemplate!: TemplateRef<any>;

  columns: ColumnDef[] = [];

  tableConfig!: TableConfig;

  constructor(
    private countryService: CountryService,
    private cdr: ChangeDetectorRef
  ) {
    this.tableConfig = {
      deleteEndpoint: 'UserProfile/DeleteUser',
      bulkDeleteEndpoint: 'UserProfile/DeleteMultipleUsers',
      editRoute: '/employee-management/profile',
      idField: 'userId',
      service: this.countryService,
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
    this.getAllCountries();
  }

  ngAfterViewInit() {
    this.initializeColumns();
  }

  initializeColumns() {
    this.columns = [
      {
        columnDef: 'name',
        header: 'Name',
        sticky: true,
      },
      { columnDef: 'phoneCode', header: 'Phone Code' },
      { columnDef: 'capitalCity', header: 'Capital City' },
      {
        columnDef: 'isActive',
        header: 'Status',
        customTemplate: this.isActiveStateTemplate,
      },
      {
        columnDef: 'createdDate',
        header: 'Created Date',
        customTemplate: this.createdDateTemplate,
      },
    ];
  }

  getAllCountries() {
    this.countryService.fetchAllCountries().subscribe((response) => {
      this.allCountries = [...response];
      console.log('all Countries', this.allCountries);
      this.cdr.detectChanges();
    });
  }

  onDataChanged(updatedData: any[]) {
    this.allCountries = updatedData;
  }
}
