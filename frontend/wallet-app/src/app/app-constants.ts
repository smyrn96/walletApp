import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppConstants {
  public doughnutColors: string[] = [
    '#19297C',
    '#585481',
    '#A1867F',
    '#C49BBB',
    '#D1BCE3',
  ];

  public dashBoardIcons = {
    transaction: 'transactionIcon',
    income: 'incomeIcon',
    expense: 'expenseIcon',
    investment: 'investmentIcon',
    roundup: 'roundUpIcon',
  };
}
