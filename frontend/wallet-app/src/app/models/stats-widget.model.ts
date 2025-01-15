export interface StatsWidget {
  id: number;
  title: string;
  total: number;
  icon: string;
}

export interface DoughnutChartCategory {
  id: number;
  title: string;
  total: number;
  color: string;
}

export interface DashboardStats {
  expenses: Object[];
  expensesTotal: number;
  stats: Object[];
  statsTotal: number;
}
