import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Inventory } from './inventory/inventory';
import { AssetsInHouse } from './assets-in-house/assets-in-house';

const routes: Routes = [
  { path: 'inventory', component: Inventory },
  { path: 'assets-in-house', component: AssetsInHouse },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class AssetManagementModule {}
