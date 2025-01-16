import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TextService {
  constructor() {}

  public capitalFirstLetter(text: string) {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  public addCurrencyCharacter(amount: number, currency: string): string {
    switch (currency) {
      case 'USD':
        return '$ ' + amount;
      case 'EUR':
        return amount + ' €';
      default:
        return '';
    }
  }
}
