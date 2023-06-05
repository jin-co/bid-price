import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  acquisitionTaxRates: number[] = [
    0.01, 0.0133, 0.0167, 0.02, 0.0233, 0.0267, 0.03,
  ];
  municipalEduTaxRates: number[] = [0.001, 0.003, 0.004];
  ruralTaxRates: number[] = [0.002, 0.006, 0.008];

  isRegulatedArea: boolean = false;

  acquisitionTaxRate: number = 0;
  municipalEduTaxRate: number = 0;
  ruralTaxRate: number = 0;
  acquisitionTax: number = 0;
  municipalEduTax: number = 0;
  ruralTax: number = 0;
    
  estimatedTaxTotal: number = 0;
  estimatedTotal: number = 0;

  form!: FormGroup;
  constructor() {
    this.form = new FormGroup({
      firstBuy: new FormControl(false),
      isOver: new FormControl(false),
      price: new FormControl(null),
      bid: new FormControl(null),
      liability: new FormControl(null),
      address: new FormControl(''),
      multiHomeOrCorporate: new FormControl(0),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.calculateAcquisitionTax();
    this.calculateMunicipalEduTax();
    this.calculateRuralTax();
    this.estimatedTaxTotal =
      this.acquisitionTax + this.municipalEduTax + this.ruralTax;
    this.estimatedTotal =
      this.form.value.bid +
      this.acquisitionTax +
      this.municipalEduTax +
      this.ruralTax +
      this.form.value.liability;
  }

  calculateAcquisitionTax() {
    if (this.form.value.price < 600000000) {
      this.acquisitionTaxRate = this.acquisitionTaxRates[0];
    } else if (this.form.value.price <= 650000000) {
      this.acquisitionTaxRate = this.acquisitionTaxRates[1];
    } else if (this.form.value.price <= 700000000) {
      this.acquisitionTaxRate = this.acquisitionTaxRates[2];
    } else if (this.form.value.price <= 750000000) {
      this.acquisitionTaxRate = this.acquisitionTaxRates[3];
    } else if (this.form.value.price <= 800000000) {
      this.acquisitionTaxRate = this.acquisitionTaxRates[4];
    } else if (this.form.value.price <= 850000000) {
      this.acquisitionTaxRate = this.acquisitionTaxRates[5];
    } else {
      this.acquisitionTaxRate = this.acquisitionTaxRates[6];
    }
    this.acquisitionTax = this.form.value.price * this.acquisitionTaxRate;

    if (this.form.value.firstBuy) {
      if (this.form.value.price <= 150000000) {
        this.acquisitionTax = 0;
      } else {
        this.acquisitionTax = this.acquisitionTax / 2;
      }
    }
  }

  calculateMunicipalEduTax() {
    if (this.form.value.price <= 600000000) {
      this.municipalEduTaxRate = this.municipalEduTaxRates[0];
    } else if (this.form.value.price <= 900000000) {
      this.municipalEduTaxRate = (this.form.value.price * (2 / 300000000) - 3) * (1 / 100)
    } else {
      this.municipalEduTaxRate = this.municipalEduTaxRates[1];
    }
    this.municipalEduTax = this.form.value.price * this.municipalEduTaxRate;
  }

  calculateRuralTax() {
    if (this.form.value.isOver) {
      this.ruralTaxRate = this.ruralTaxRates[0];
      console.log(this.ruralTaxRate);
      console.log(this.ruralTaxRates[0]);
    }
    this.ruralTax = this.form.value.price * this.ruralTaxRate;
  }
}
