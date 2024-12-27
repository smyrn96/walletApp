import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/models/menu-item.model';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  primaryMenu: MenuItem[] = [
    { id: 0, title: 'Dashboard', icon: 'dashboardIcon' },
    { id: 1, title: 'Transactions', icon: 'transactionIcon' },
    { id: 2, title: 'Investments', icon: 'investmentIcon' },
  ];

  secondaryMenu: MenuItem[] = [
    { id: 3, title: 'Settings', icon: 'settingsIcon' },
    { id: 4, title: 'Help', icon: 'helpIcon' },
  ];
  isMenuCollapsed: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(min-width: 1100px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMenuCollapsed = false;
        } else {
          this.isMenuCollapsed = true;
        }
      });
  }
}
