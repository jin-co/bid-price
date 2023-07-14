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
  base: number = 0;
  discountRate: boolean = false;

  cityTax: number = 0.0014;
  cityTaxRate: number = 0.0014;
  cityTaxMaxLimit: number = 0;
  municipalEduTaxRate: number = 0.2;
  municipalEduTax: number = 0;

  fireTaxRate: number[] = [0.0004, 0.0005, 0.0006, 0.0008, 0.001, 0.012];
  fireTax: number = 0;

  form!: FormGroup;
  constructor() {
    this.form = new FormGroup({
      soleHouse: new FormControl(false),
      isCityTax: new FormControl(false),
      price: new FormControl(null),
      address: new FormControl(null),
      lastTax: new FormControl(null),
      lastCityTax: new FormControl(null),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.standard = this.form.value.price * this.standardRate;
    this.cityTax = this.standard * this.cityTaxRate;
    this.calculateFireTax();
    this.calculateStandardTax();
    this.standard = this.form.value.price * this.standardRate;
  }

  calculateFireTax() {
    if (this.standard <= 60000000) {
      this.fireTax = this.standard * this.fireTaxRate[0];
    } else if (this.standard <= 13000000) {
      let temp = this.standard - 6000000;
      this.fireTax = 2400 + temp * this.fireTaxRate[1];
    } else if (this.standard <= 26000000) {
      let temp = this.standard - 13000000;
      this.fireTax = 5900 + temp * this.fireTaxRate[2];
    } else if (this.standard <= 39000000) {
      let temp = this.standard - 26000000;
      this.fireTax = 13700 + temp * this.fireTaxRate[3];
    } else if (this.standard <= 64000000) {
      let temp = this.standard - 39000000;
      this.fireTax = 24100 + temp * this.fireTaxRate[4];
    } else {
      let temp = this.standard - 64000000;
      this.fireTax = 49100 + temp * this.fireTaxRate[5];
    }
  }

  calculateStandardTax() {
    this.base = 0;
    if (this.form.value.price <= 100000000) {
      if (this.form.value.soleHouse) {
        this.discountRate = true;
        this.standardTaxRate = 0.0005;
      } else {
        this.discountRate = false;
        this.standardTaxRate = this.standardTaxRates[0];
      }
      this.maxLimit = this.form.value.lastTax * 1.05;
      this.cityTaxMaxLimit = this.form.value.lastCityTax * 1.05;
    } else if (this.form.value.price <= 250000000) {
      this.standard = this.standard - 60000000;
      if (this.form.value.soleHouse) {
        this.discountRate = true;
        this.base = 30000;
        this.standardTaxRate = 0.001;
      } else {
        this.discountRate = false;
        this.base = 60000;
        this.standardTaxRate = this.standardTaxRates[1];
      }
      // this.doubleTaxSubtraction = 30000;
      this.maxLimit = this.form.value.lastTax * 1.1;
      this.cityTaxMaxLimit = this.form.value.lastCityTax * 1.1;
    } else if (this.form.value.price <= 500000000) {
      this.standard = this.standard - 150000000;
      if (this.form.value.soleHouse) {
        this.discountRate = true;
        this.base = 120000;
        this.standardTaxRate = 0.002;
      } else {
        this.discountRate = false;
        this.base = 195000;
        this.standardTaxRate = this.standardTaxRates[2];
      }
      // this.doubleTaxSubtraction = 180000;
      this.maxLimit = this.form.value.lastTax * 1.3;
      this.cityTaxMaxLimit = this.form.value.lastCityTax * 1.3;
    } else {
      if (this.form.value.soleHouse && this.form.value.price <= 900000000) {
        this.discountRate = true;
        this.base = 120000;
        this.standard = this.standard - 300000000;
        this.standardTaxRate = 0.0035;
      } else {
        this.base = 570000;
        this.standard = this.standard - 300000000;
        this.standardTaxRate = this.standardTaxRates[3];
      }
      // this.doubleTaxSubtraction = 630000;
    }

    this.standardTax =
      this.standard * this.standardTaxRate -
      this.doubleTaxSubtraction +
      this.base;

    if (this.maxLimit > 0 && this.standardTax > this.maxLimit) {
      this.standardTax = this.maxLimit;
    }

    if (this.cityTaxMaxLimit > 0 && this.cityTax > this.cityTaxMaxLimit) {
      this.cityTax = this.cityTaxMaxLimit;
    }

    this.municipalEduTax = this.standardTax * this.municipalEduTaxRate;
  }

  onVacationHouseClick() {
    this.standard = this.form.value.price * this.standardRate;
    this.standardTax = this.standard * 0.04;
  }
}
