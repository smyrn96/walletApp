export interface StatsWidget {
  id: number;
  title: string;
  total: number | string;
  icon: string;
}

export interface DoughnutChartCategory {
  id: number;
  title: string;
  total: number;
}

export interface DashboardStats {
  expenses: DoughnutChartCategory[];
  expensesTotal: number;
  stats: StatsWidget[];
  statsTotal: number;
}

export interface InvestmentStats {
  investments: DoughnutChartCategory[];
  investmentsTotal: number;
}

export interface HttpResponseTemplate<E> {
  status: string;
  data: E;
}
