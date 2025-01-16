import { Component, Input } from '@angular/core';
import { StatsWidget } from 'src/app/models/stats-widget.model';
import { TextService } from 'src/app/services/text-service.service';

@Component({
  selector: 'stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss'],
})
export class StatsCardComponent {
  @Input() stat: StatsWidget = {
    id: 0,
    title: 'Transactions',
    total: 0,
    icon: '',
  };
  statTitle: string = '';

  constructor(private textService: TextService) {}

  ngOnInit() {
    this.statTitle = this.textService.capitalFirstLetter(this.stat.title);
    this.stat.total = this.textService.addCurrencyCharacter(
      this.stat.total as number,
      'EUR'
    );
  }
}
