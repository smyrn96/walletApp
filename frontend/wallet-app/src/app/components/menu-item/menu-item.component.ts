import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/app/models/menu-item.model';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  @Input() item: MenuItem = { id: 0, title: 'Dashboard', icon: 'dashboard' };
  isMenuCollapsed: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
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
