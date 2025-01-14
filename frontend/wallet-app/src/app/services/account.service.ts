import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private API_URL: string = 'http://localhost:8000/api/v1/';

  private apiUrl: string = `${this.API_URL}/login`;
  constructor(private http: HttpClient) {}

  onLogin(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }
}
