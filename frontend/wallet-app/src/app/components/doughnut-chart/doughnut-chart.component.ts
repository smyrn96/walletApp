import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { AppConstants } from 'src/app/app-constants';
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
    },
  ];
  @Input() widgetTitle: string = '';
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef;
  public chart: any;
  labels: string[] = [];
  colors: string[] = [];
  values: number[] = [];

  constructor(
    private textService: TextService,
    private constants: AppConstants
  ) {}

  ngOnInit() {
    this.colors = this.constants.doughnutColors;
    this.createChart();
  }

  ngOnChanges(): void {
    //Labels and values on change rerender
    this.labels = this.items.map((item) =>
      this.textService.capitalFirstLetter(item.title)
    );
    this.values = this.items.map((item) => item.total);

    if (this.chart) {
      //updating chart with those values
      this.updateChart();
    }
  }

  createChart() {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.labels,
        datasets: [
          {
            label: 'Total',
            data: this.values,
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

  updateChart() {
    this.chart.data.labels = this.labels;
    this.chart.data.datasets[0].data = this.values;

    this.chart.update();
  }
}
