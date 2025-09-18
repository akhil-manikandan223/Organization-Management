import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutWrapper } from './layout-wrapper/layout-wrapper';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutWrapper],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Persona';
}
