import { Component, HostBinding, input, signal } from '@angular/core';
import { Widgets } from '../../models/dashboard';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { WidgetOptions } from './widget-options/widget-options';
import {CdkDrag, CdkDragPlaceholder} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-widget',
  imports: [
    NgComponentOutlet,
    MaterialModule,
    WidgetOptions,
    CommonModule,
    CdkDrag,
    CdkDragPlaceholder,
  ],
  templateUrl: './widget.html',
  styleUrl: './widget.scss',
})
export class Widget {
  data = input.required<Widgets>();
  showOptions = signal(false);

  @HostBinding('style.grid-area')
  get gridArea(): string {
    const d = this.data();
    return `span ${d?.rows ?? 1} / span ${d?.columns ?? 1}`;
  }
}
