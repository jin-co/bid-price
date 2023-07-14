import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css'],
})
export class OutputComponent {
  @Input() isYes: boolean = false;
  @Input() title: string = '';
  @Input() description: string = '';
}
