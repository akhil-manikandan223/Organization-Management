import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MessageManagment } from './message-managment/message-managment';
import { Notifications } from './notifications/notifications';

const routes: Routes = [
  {
    path: 'notifications',
    component: Notifications,
    data: { title: 'Notifications' },
  },
  {
    path: 'message',
    component: MessageManagment,
    data: { title: 'Alert Management' },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), CommonModule],
})
export class CommunicationModule {}
