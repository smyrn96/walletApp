import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss'],
})
export class PageWrapperComponent implements OnInit {
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
