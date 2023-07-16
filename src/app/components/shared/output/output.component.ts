import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
})
export class OutputComponent {
  //common: options -> 1. y-n, 2. currency-with-rate, 3. currency 
  @Input() outputType: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  
  //for the option 1
  @Input() isYes: boolean = false;

  //for the option 2 and 3
  @Input() output: number = 0;
  @Input() rate: number = 0;  
}
