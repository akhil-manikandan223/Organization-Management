import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SavedDocuments } from './saved-documents/saved-documents';

const routes: Routes = [
  {
    path: 'saved-documents',
    component: SavedDocuments,
    data: { title: 'Saved Documents' },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class DocumentsManagementModule {}
