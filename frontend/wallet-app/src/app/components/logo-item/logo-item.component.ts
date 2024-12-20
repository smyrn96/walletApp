import { Component } from '@angular/core';

@Component({
  selector: 'logo-item',
  templateUrl: './logo-item.component.html',
  styleUrls: ['./logo-item.component.scss'],
})
export class LogoItemComponent {
  appTitle: string = 'walletApp';
}
