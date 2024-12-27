import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'avatar-container',
  templateUrl: './avatar-container.component.html',
  styleUrls: ['./avatar-container.component.scss'],
})
export class AvatarContainerComponent {
  @Input() iconName: string = '';
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
