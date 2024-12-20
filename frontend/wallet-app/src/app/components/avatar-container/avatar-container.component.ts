import { Component, Input } from '@angular/core';

@Component({
  selector: 'avatar-container',
  templateUrl: './avatar-container.component.html',
  styleUrls: ['./avatar-container.component.scss'],
})
export class AvatarContainerComponent {
  @Input() iconName: string = '';
}
