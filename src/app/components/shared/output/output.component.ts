import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
})
export class OutputComponent {
  @Input() outputType: string = '';
  @Input() title: string = '';
  
  @Input() isYes: boolean = false;
  @Input() description: string = '';

  @Input() output: number = 0;
  @Input() rate: number = 0;

  constructor(public currencyPipe:CurrencyPipe) {}

  selectCurrency() {
    this.currencyPipe
  }
}
