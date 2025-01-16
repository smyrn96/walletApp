import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  DashboardStats,
  HttpResponseTemplate,
  InvestmentStats,
  StatsWidget,
} from '../models/stats-widget.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private API_URL: string = 'http://localhost:8000/api/v1';
  private apiUrlStats: string = `${this.API_URL}/transactions/stats`;
  private apiUrlInvestments: string = `${this.API_URL}/investments/stats`;

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<HttpResponseTemplate<DashboardStats>> {
    return this.http.get<HttpResponseTemplate<DashboardStats>>(
      this.apiUrlStats
    );
  }

  getDashboardInvestments(): Observable<HttpResponseTemplate<InvestmentStats>> {
    return this.http.get<HttpResponseTemplate<InvestmentStats>>(
      this.apiUrlInvestments
    );
  }
}
