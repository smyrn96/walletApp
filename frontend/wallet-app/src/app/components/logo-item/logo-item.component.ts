import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'logo-item',
  templateUrl: './logo-item.component.html',
  styleUrls: ['./logo-item.component.scss'],
})
export class LogoItemComponent {
  appTitle: string = 'walletApp';
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
