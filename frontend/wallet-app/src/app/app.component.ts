import { Component } from '@angular/core';
import { IconServiceService } from './services/icon-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'wallet-app';

  constructor(private iconService: IconServiceService) {}

  ngOnInit() {
    this.iconService.registerIcons();
  }
}
