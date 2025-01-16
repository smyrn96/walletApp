import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';
import {
  DashboardStats,
  DoughnutChartCategory,
  HttpResponseTemplate,
  InvestmentStats,
  StatsWidget,
} from 'src/app/models/stats-widget.model';
import { AppConstants } from 'src/app/app-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title: string = 'Welcome back Manos!';
  subtitle: string = 'Browse your dashboard';
  icon: string = 'userIcon';
  stats: StatsWidget[] = [];

  expenses: DoughnutChartCategory[] = [];
  investments: DoughnutChartCategory[] = [];

  constructor(
    private dashboardService: DashboardService,
    private constants: AppConstants
  ) {}

  ngOnInit(): void {
    this.dashboardService
      .getDashboardStats()
      .subscribe((stats: HttpResponseTemplate<DashboardStats>) => {
        const data = stats.data;

        console.log(data.stats);
        this.stats = this.buildStatsArray(data.stats, data.statsTotal);

        console.log(this.stats);
        this.expenses = data.expenses;
      });

    this.dashboardService
      .getDashboardInvestments()
      .subscribe((investments: HttpResponseTemplate<InvestmentStats>) => {
        const data = investments.data;
        this.investments = data.investments;
      });
  }

  buildStatsArray(stats: StatsWidget[], statsTotal: number): StatsWidget[] {
    const constantIcons = this.constants.dashBoardIcons;
    const transactionsIcon = constantIcons['transaction'];
    stats.forEach((stat: StatsWidget) => {
      stat.id += 1;
      stat.icon =
        this.constants.dashBoardIcons[stat.title as keyof typeof constantIcons];
      return stat;
    });

    return [
      {
        id: 0,
        title: 'transactions',
        total: statsTotal,
        icon: transactionsIcon,
      } as StatsWidget,
      ...stats,
    ];
  }
}
