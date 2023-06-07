import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-having-tax',
  templateUrl: './having-tax.component.html',
  styleUrls: ['./having-tax.component.css'],
})
export class HavingTaxComponent implements OnInit {
  standardRate = 0.6;
  standard: number = 0;
  standardTax: number = 0;
  standardTaxRate: number = 0;
  doubleTaxSubtraction: number = 0;
  maxLimit: number = 0;
  standardTaxRates: number[] = [0.001, 0.0015, 0.0025, 0.004];

  cityTax: number = 0.0014;
  municipalEduRate: number = 0.2;
  fireRate: number[] = [0.0004, 0.012];

  form!: FormGroup;
  constructor() {
    this.form = new FormGroup({
      price: new FormControl(null),
      lastTax: new FormControl(null),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.standard = this.form.value.price * this.standardRate;
    this.calculateStandardTax();
  }

  calculateStandardTax() {
    if (this.standard < 60000000) {
      this.standardTaxRate = this.standardTaxRates[0];
      this.maxLimit = this.form.value.lastTax * 1.05;
    } else if (this.standard < 150000000) {
      this.standardTaxRate = this.standardTaxRates[1];
      this.doubleTaxSubtraction = 30000;
      this.maxLimit = this.form.value.lastTax * 1.1;
    } else if (this.standard < 300000000) {
      this.standardTaxRate = this.standardTaxRates[2];
      this.doubleTaxSubtraction = 180000;
      this.maxLimit = this.form.value.lastTax * 1.3;
    } else {
      this.standardTaxRate = this.standardTaxRates[3];
      this.doubleTaxSubtraction = 630000;
    }
    this.standardTax =
      this.standard * this.standardTaxRate - this.doubleTaxSubtraction;
  }
}
