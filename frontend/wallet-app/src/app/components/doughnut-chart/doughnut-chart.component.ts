import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { DoughnutChartCategory } from 'src/app/models/stats-widget.model';
import { TextService } from 'src/app/services/text-service.service';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent {
  @Input() items: DoughnutChartCategory[] = [
    {
      id: 0,
      title: 'food',
      total: 200,
      color: 'transactionIcon',
    },
  ];
  @Input() widgetTitle: string = '';
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef;
  public chart: any;
  constructor(private textService: TextService) {}
  labels: string[] = [];
  colors: string[] = [];

  ngOnInit(): void {
    this.labels = this.items.map((item) =>
      this.textService.capitalFirstLetter(item.title)
    );
    this.colors = this.items.map((item) => item.color);

    this.createChart();
  }

  createChart() {
    const values = this.items.map((item) => item.total);

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.labels,
        datasets: [
          {
            label: 'Total',
            data: values,
            backgroundColor: this.colors,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
