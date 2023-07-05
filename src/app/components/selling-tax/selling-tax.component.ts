import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-selling-tax',
  templateUrl: './selling-tax.component.html',
  styleUrls: ['./selling-tax.component.css']
})
export class SellingTaxComponent {
  revenue: number = 0;
  totalRevenue: number = 0;
  expenses: number = 0;
  standard: number = 0;
  expensesRate: number = 0;
  deduction: number = 0;
  revenueTax: number = 0;
  finalRevenueTax: number = 0;
  regionalTax: number = 0;
  isRegistered: boolean = false;

  rentTax: number = 0;
  depositTax: number = 0;
  bankDepositInterestRate: number = 0;

  expensesRates: { 1: number; 2: number; 3: number; 4: number; 5: number }[] = [
    { 1: 37.4, 2: 42.6, 3: 61.6, 4: 59.2, 5: 43.4 },
    { 1: 15.2, 2: 13.1, 3: 17.9, 4: 19, 5: 3.8 },
  ];

  form!: FormGroup;
  constructor() {
    this.form = new FormGroup({
      rent: new FormControl(null),
      deposit: new FormControl(null),
      expenses: new FormControl(null),
      revenueDeduction: new FormControl(null),
      isIntegratedOrSeparate: new FormControl('integrated'),
      registered: new FormControl(false),
      otherRevenue: new FormControl(null),
      multiHome: new FormControl(0),
      expensesRateChart: new FormControl(0),
      lastRevenue: new FormControl(0),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.calculateTax();
  }

  calculateTax() {
    this.expenses = +this.form.value.expenses;

    //임대 경비율 계산
    if (
      +this.form.value.lastRevenue > 24000000 ||
      +this.form.value.rent > 75000000
    ) {
      //기준
      this.expensesRates[1][1];
    } else {
      //단순 소득 = 수입 - 수입 * 단순경비율
      this.expenses =
        this.form.value.rent - this.form.value.rent * +this.expensesRates[0][1];
    }
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

      //임대소득(임대수입 - 필요경비)
      this.revenue =
        +this.form.value.rent +
        +this.form.value.deposit -
        this.expenses * this.expensesRate;

      //과세표준(종합소득 - 소득공제)
      this.standard = this.revenue - this.deduction;

      //산출세액(과세표준 * 세율)
      this.revenueTax = this.standard * 0.14;

      //결정세액(산출세액 - 소형주택임대사업자 감면)
      this.finalRevenueTax = this.revenueTax;

      //지방소득세(종합소득세 * 10%)
      this.regionalTax = this.revenueTax * 0.1;
    } else {
      if (this.standard <= 12000000) {
        this.expensesRate = 0.06;
        this.deduction = 0;
      } else if (this.standard <= 46000000) {
        this.expensesRate = 0.15;
        this.deduction = 1080000;
      } else if (this.standard <= 88000000) {
        this.expensesRate = 0.24;
        this.deduction = 5220000;
      } else if (this.standard <= 150000000) {
        this.expensesRate = 0.35;
        this.deduction = 14900000;
      } else if (this.standard <= 300000000) {
        this.expensesRate = 0.38;
        this.deduction = 19400000;
      } else if (this.standard <= 500000000) {
        this.expensesRate = 0.4;
        this.deduction = 25400000;
      } else if (this.standard <= 1000000000) {
        this.expensesRate = 0.42;
        this.deduction = 35400000;
      } else {
        this.expensesRate = 0.45;
        this.deduction = 65400000;
      }

      //임대소득(임대수입 - 필요경비)
      this.revenue =
        +this.form.value.rent + +this.form.value.deposit - this.expenses;

      //종합소득(임대소득 + 종합과세대상 다른소득)
      this.totalRevenue = this.revenue + +this.form.value.otherRevenue;

      //과세표준(종합소득 - 소득공제)
      this.standard = this.revenue - +this.form.value.revenueDeduction;

      //산출세액(과세표준 * 세율)
      this.revenueTax = this.standard * 0.15;

      //결정세액(산출세액 - 공제, 감면)
      this.finalRevenueTax = this.revenueTax;

      //지방소득세(종합소득세 * 10%)
      this.regionalTax = this.revenueTax * 0.1;
    }
  }
}
