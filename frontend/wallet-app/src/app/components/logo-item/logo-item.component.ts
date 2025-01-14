import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo-item',
  templateUrl: './logo-item.component.html',
  styleUrls: ['./logo-item.component.scss'],
})
export class LogoItemComponent {
  @Input() isMenuCollapsed: boolean | undefined = false;
  appTitle: string = 'walletApp';

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    if (this.isMenuCollapsed !== undefined) {
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
}
