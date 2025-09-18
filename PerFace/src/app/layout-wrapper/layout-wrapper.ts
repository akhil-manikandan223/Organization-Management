import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-layout-wrapper',
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './layout-wrapper.html',
  styleUrl: './layout-wrapper.scss',
})
export class LayoutWrapper {}
