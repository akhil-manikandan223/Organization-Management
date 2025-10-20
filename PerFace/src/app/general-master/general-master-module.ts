import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Countries } from './countries/countries';
import { StatesProvinces } from './states-provinces/states-provinces';

const routes: Routes = [
  { path: 'country', component: Countries, data: { title: 'Country' } },
  { path: 'states-provinces', component: StatesProvinces, data: { title: 'States & Provinces' } },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class GeneralMasterModule { }
