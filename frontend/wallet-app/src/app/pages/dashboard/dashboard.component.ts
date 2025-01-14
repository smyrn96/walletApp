import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import {
  DoughnutChartCategory,
  StatsWidget,
} from 'src/app/models/stats-widget.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title: string = 'Welcome back Manos!';
  subtitle: string = 'Browse your dashboard';
  icon: string = 'userIcon';
  testDashboardStats: StatsWidget[] = [];
  stats: StatsWidget[] = [
    { id: 0, title: 'transactions', total: 1200, icon: 'transactionIcon' },
    { id: 1, title: 'income', total: 2000, icon: 'incomeIcon' },
    { id: 2, title: 'expenses', total: 1000, icon: 'expenseIcon' },
    { id: 3, title: 'investments', total: 100, icon: 'investmentIcon' },
    { id: 4, title: 'roundups', total: 10, icon: 'roundUpIcon' },
  ];

  expenses: DoughnutChartCategory[] = [
    { id: 0, title: 'food', total: 200, color: '#19297C' },
    { id: 1, title: 'transportation', total: 200, color: '#585481' },
    { id: 2, title: 'health', total: 200, color: '#A1867F' },
    { id: 3, title: 'education', total: 200, color: '#C49BBB' },
    { id: 4, title: 'others', total: 200, color: '#D1BCE3' },
  ];

  investments: DoughnutChartCategory[] = [
    { id: 0, title: 'stock', total: 20, color: '#19297C' },
    { id: 1, title: 'bond', total: 20, color: '#585481' },
    { id: 2, title: 'crypto', total: 30, color: '#A1867F' },
    { id: 3, title: 'etf', total: 30, color: '#C49BBB' },
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService
      .getDashboardStats()
      .subscribe((stats: StatsWidget[]) => {
        console.log(stats);
        this.testDashboardStats = stats;
      });
  }
}
