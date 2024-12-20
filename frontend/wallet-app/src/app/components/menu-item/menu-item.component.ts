import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/app/models/menu-item.model';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  @Input() item: MenuItem = { id: 0, title: 'Dashboard', icon: 'dashboard' };
}
