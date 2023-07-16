import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-combined-housing-tax',
  templateUrl: './combined-housing-tax.component.html',
  styleUrls: ['./combined-housing-tax.component.css'],
})
export class CombinedHousingTaxComponent {
  standardRate = 1;
  standard: number = 0;
  standardTax: number = 0;
  standardTaxRate: number = 0;
  maxLimit: number = 0;
  maxLimitRate: number = 0;
  subtraction: number = 0;
  taxDiscountAge: number = 0;
  taxDiscountPeriod: number = 0;
  taxDiscount: number = 0;
  taxTotal: number = 0;
  standardTaxRates: number[] = [
    0.006, 0.008, 0.012, 0.016, 0.022, 0.03, 0.036, 0.05, 0.06,
  ];

  ruralTax: number = 0;
  ruralTaxRate: number = 0;

  form!: FormGroup;
  constructor() {
    this.form = new FormGroup({
      cooperate: new FormControl(false),
      isCityTax: new FormControl(false),
      price: new FormControl(null),
      lastTax: new FormControl(null),
      lastCityTax: new FormControl(null),
      multiHome: new FormControl(0),
      age: new FormControl(0),
      period: new FormControl(0),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.value.multiHome <= 1) {
      this.standard = (this.form.value.price - 1100000000) * this.standardRate;            
    } else {
      this.standard = (this.form.value.price - 600000000) * this.standardRate;
    }
    this.calculateTax();
  }

  calculateTax() {
    if (this.form.value.cooperate) {
      if (this.form.value.multiHome <= 2) {
        this.standardTaxRate = 0.03;
      } else {
        this.standardTaxRate = 0.06;
      }
    } else {
      if (this.form.value.age >= 60 && this.form.value.age < 65) {
        this.taxDiscountAge = 0.2;
      } else if (this.form.value.age >= 65 && this.form.value.age < 70) {
        this.taxDiscountAge = 0.3;
      } else if (this.form.value.age >= 70) {
        this.taxDiscountAge = 0.4;
      }

      if (this.form.value.period >= 5 && this.form.value.period < 10) {
        this.taxDiscountPeriod = 0.2;
      } else if (this.form.value.period >= 10 && this.form.value.period < 15) {
        this.taxDiscountPeriod = 0.4;
      } else if (this.form.value.period >= 15) {
        this.taxDiscountPeriod = 0.5;
      }

      if (this.form.value.multiHome <= 2) {
        this.maxLimitRate = 1.5;
        if (this.standard <= 300000000) {
          this.standardTaxRate = this.standardTaxRates[0];
        } else if (this.standard <= 600000000) {
          this.subtraction = 600000;
          this.standardTaxRate = this.standardTaxRates[1];
        } else if (this.standard <= 1200000000) {
          this.subtraction = 3000000;
          this.standardTaxRate = this.standardTaxRates[2];
        } else if (this.standard <= 5000000000) {
          this.subtraction = 7800000;
          this.standardTaxRate = this.standardTaxRates[3];
        } else if (this.standard <= 9400000000) {
          this.subtraction = 37800000;
          this.standardTaxRate = this.standardTaxRates[4];
        } else {
          this.subtraction = 113000000;
          this.standardTaxRate = this.standardTaxRates[5];
        }
      } else {
        this.maxLimitRate = 3;
        if (this.form.value.price <= 300000000) {
          this.standardTaxRate = this.standardTaxRates[2];
        } else if (this.form.value.price <= 600000000) {
          this.subtraction = 1200000;
          this.standardTaxRate = this.standardTaxRates[3];
        } else if (this.form.value.price <= 1200000000) {
          this.subtraction = 4800000;
          this.standardTaxRate = this.standardTaxRates[4];
        } else if (this.form.value.price <= 5000000000) {
          this.subtraction = 21600000;
          this.standardTaxRate = this.standardTaxRates[6];
        } else if (this.form.value.price <= 9400000000) {
          this.subtraction = 91600000;
          this.standardTaxRate = this.standardTaxRates[7];
        } else {
          this.subtraction = 185600000;
          this.standardTaxRate = this.standardTaxRates[8];
        }
      }
    }

    this.taxDiscount = this.taxDiscountAge + this.taxDiscountPeriod;

    this.standardTax = this.standard * this.standardTaxRate - this.subtraction;  
    
    if (this.taxDiscount !== 0) {
      if (this.taxDiscount > 0.8) {
        this.taxDiscount = 0.8;
      }
      this.taxDiscount = this.standardTax * this.taxDiscount;
    }

    this.maxLimit =
      (+this.form.value.lastTax + +this.form.value.lastCityTax) *
      this.maxLimitRate;

    this.ruralTax = this.taxTotal * 0.02;

    this.taxTotal = this.standardTax + this.ruralTax;

    if (this.maxLimit > 0 && this.standardTax > this.maxLimit) {
      this.standardTax = this.maxLimit;
    }
  }
}
