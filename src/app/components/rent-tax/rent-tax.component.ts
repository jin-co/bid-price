import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rent-tax',
  templateUrl: './rent-tax.component.html',
  styleUrls: ['./rent-tax.component.css'],
})
export class RentTaxComponent {
  revenue: number = 0;
  expenses: number = 0;
  expensesRate: number = 0;
  deduction: number = 0;
  revenueTax: number = 0;
  regionalTax: number = 0;
  isRegistered: boolean = false;

  rentTax: number = 0;
  depositTax: number = 0;
  bankDepositInterestRate: number = 0;

  form!: FormGroup;
  constructor() {
    this.form = new FormGroup({
      rent: new FormControl(null),
      deposit: new FormControl(null),
      expenses: new FormControl(null),
      isIntegratedOrSeparate: new FormControl('integrated'),
      registered: new FormControl(false),
      otherRevenue: new FormControl(null),
      multiHome: new FormControl(0),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.calculateTax();
  }

  calculateTax() {
    this.revenue = +this.form.value.rent + +this.form.value.deposit;
    this.expenses = +this.form.value.expenses;
    this.revenueTax =
      (this.revenue -
        this.expenses +
        +this.form.value.otherRevenue -
        this.deduction) *
      0.15;
    this.regionalTax = this.revenueTax * 0.1;
  }

  onStandardChange() {
    //간주임대료 계산식
    this.depositTax =
      (((+this.form.value.deposit - 300000000) * 0.6 * 1) / 365) *
      this.bankDepositInterestRate;

    this.isRegistered = !this.isRegistered;
    if (this.form.value.isIntegratedOrSeparate == 'separated') {
      if (this.isRegistered) {
        this.expensesRate = 0.6;
        this.deduction = 4000000;
      } else {
        this.expensesRate = 0.5;
        this.deduction = 2000000;
      }
    } else {
      this.expensesRate = 0;
      this.deduction = 0;
    }
  }
}
