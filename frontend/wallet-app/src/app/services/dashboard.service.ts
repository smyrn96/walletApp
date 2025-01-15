import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardStats, StatsWidget } from '../models/stats-widget.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private API_URL: string = 'http://localhost:8000/api/v1';

  private apiUrl: string = `${this.API_URL}/transactions/stats`;
  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(this.apiUrl);
  }
}
