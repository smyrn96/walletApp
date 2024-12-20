import { Component, Input } from '@angular/core';

@Component({
  selector: 'title-container',
  templateUrl: './title-container.component.html',
  styleUrls: ['./title-container.component.scss'],
})
export class TitleContainerComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
