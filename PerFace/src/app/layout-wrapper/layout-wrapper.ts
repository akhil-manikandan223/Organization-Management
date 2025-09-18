import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-layout-wrapper',
  imports: [
    RouterOutlet
  ],
  templateUrl: './layout-wrapper.html',
  styleUrl: './layout-wrapper.scss'
})
export class LayoutWrapper {

}
