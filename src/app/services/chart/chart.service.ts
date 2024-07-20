import { Injectable } from '@angular/core';
import Chart from 'chart.js/auto';

import { User } from '@/app/components/users/users.model';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private chart: Chart | null = null;

  constructor() {}

  createChart(chartRef: HTMLCanvasElement, user: User) {
    const ctx = chartRef.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: user.workouts.map(w => w.type),
          datasets: [
            {
              label: 'Minutes',
              data: user.workouts.map(w => w.minutes),
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  updateChart(user: User) {
    if (this.chart) {
      this.chart.data.labels = user.workouts.map((w: any) => w.type);
      this.chart.data.datasets[0].data = user.workouts.map(
        (w: any) => w.minutes
      );
      this.chart.update();
    }
  }
}
