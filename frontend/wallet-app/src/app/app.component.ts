import { Component } from '@angular/core';
import { IconService } from './services/icon-service.service';
import { TextService } from './services/text-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wallet-app';

  constructor(private iconService: IconService) {}

  ngOnInit() {
    this.iconService.registerIcons();
  }
}
