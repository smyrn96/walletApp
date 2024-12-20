import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title: string = 'Welcome back Manos!';
  subtitle: string = 'Browse your dashboard';
  icon: string = 'userIcon';

  constructor() {}

  ngOnInit(): void {}
}
