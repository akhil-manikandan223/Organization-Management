import { Component, ElementRef, viewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-metrics',
  imports: [MaterialModule],
  templateUrl: './metrics.html',
  styleUrl: './metrics.scss',
})
export class Metrics {
  chart = viewChild.required<ElementRef>('chart');

  ngOnInit() {
    new Chart(this.chart().nativeElement, {
      type: 'line',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
        datasets: [
          {
            label: 'Views',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: 'start',
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.4,
          },
        },
      },
    });
  }
}
