import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chart-component',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  // Chart data
  chartData = [
    { name: 'Germany', value: 8940000 },
    { name: 'USA', value: 5000000 },
    { name: 'France', value: 7200000 },
    { name: 'UK', value: 6200000 },
    { name: 'India', value: 8300000 },
  ];

  // Chart options
  view: [number, number] = [700, 400]; // Width x Height of the chart

  // Options for the chart
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';

  // Color scheme
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF5733'],
  };

  // Event handler for when a bar is clicked
  onSelect(event: any): void {
    console.log('Bar clicked:', event);
  }

  constructor() {}

  ngOnInit() {}
}
