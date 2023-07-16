import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-selling-tax',
  templateUrl: './selling-tax.component.html',
  styleUrls: ['./selling-tax.component.css'],
})
export class SellingTaxComponent {
  taxStandard: number = 0;
  gains: number = 0;
  revenue: number = 0;
  expenses: number = 0;
  buyingPrice: number = 0;
  sellingPrice: number = 0;
  standardPrice: number = 0;
  sellingTax: number = 0;
  sellingTaxRate: number = 0;
  secondarySellingTax: number = 0;
  secondarySellingTaxRate: number = 0.05;
  weightedTaxRate: number = 0;
  deduction: number = 0;
  longTermRetentionDeduction: number = 0;
  longTermRetentionDeductionRate: number = 0;
  longTermDwellingDeductionRate: number = 0;
  generalDeduction: number = 2500000;

  form!: FormGroup;
  constructor() {
    this.form = new FormGroup({
      buyingPrice: new FormControl(null),
      expenses: new FormControl(null),
      sellingPrice: new FormControl(null),
      standardPrice: new FormControl(null),
      multiHome: new FormControl(0),
      holdingPeriod: new FormControl(0),
      livingPeriod: new FormControl(0),
      isRegulatedArea: new FormControl(false),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.calculateTax();
  }

  calculateTax() {
    //양도차익
    this.gains =
      +this.form.value.sellingPrice -
      +this.form.value.buyingPrice -
      +this.form.value.expenses;

    //장기보유특별공제율 (제외대상: 미등기, 다주택자 조정지역, 국외, 조합원입주권)
    if (this.form.value.multiHome == 1) {
      //1세대 1주택
      if (this.form.value.holdingPeriod >= 3) {
        if (this.form.value.holdingPeriod < 4) {
          this.longTermRetentionDeductionRate = 0.12;
        } else if (this.form.value.holdingPeriod < 5) {
          this.longTermRetentionDeductionRate = 0.16;
        } else if (this.form.value.holdingPeriod < 6) {
          this.longTermRetentionDeductionRate = 0.2;
        } else if (this.form.value.holdingPeriod < 7) {
          this.longTermRetentionDeductionRate = 0.24;
        } else if (this.form.value.holdingPeriod < 8) {
          this.longTermRetentionDeductionRate = 0.28;
        } else if (this.form.value.holdingPeriod < 9) {
          this.longTermRetentionDeductionRate = 0.32;
        } else if (this.form.value.holdingPeriod < 10) {
          this.longTermRetentionDeductionRate = 0.36;
        } else {
          this.longTermRetentionDeductionRate = 0.4;
        }
      }

      if (this.form.value.livingPeriod >= 2) {
        if (this.form.value.livingPeriod < 3) {
          this.longTermDwellingDeductionRate = 0.08;
        } else if (this.form.value.livingPeriod < 4) {
          this.longTermDwellingDeductionRate = 0.16;
        } else if (this.form.value.livingPeriod < 5) {
          this.longTermDwellingDeductionRate = 0.16;
        } else if (this.form.value.livingPeriod < 6) {
          this.longTermDwellingDeductionRate = 0.2;
        } else if (this.form.value.livingPeriod < 7) {
          this.longTermDwellingDeductionRate = 0.24;
        } else if (this.form.value.livingPeriod < 8) {
          this.longTermDwellingDeductionRate = 0.28;
        } else if (this.form.value.livingPeriod < 9) {
          this.longTermDwellingDeductionRate = 0.32;
        } else if (this.form.value.livingPeriod < 10) {
          this.longTermDwellingDeductionRate = 0.36;
        } else {
          this.longTermDwellingDeductionRate = 0.4;
        }
      }
    } else {
      if (!this.form.value.isRegulatedArea) {
        this.longTermDwellingDeductionRate = 0;
        if (this.form.value.holdingPeriod >= 3) {
          if (this.form.value.holdingPeriod < 4) {
            this.longTermRetentionDeductionRate = 0.06;
          } else if (this.form.value.holdingPeriod < 5) {
            this.longTermRetentionDeductionRate = 0.08;
          } else if (this.form.value.holdingPeriod < 6) {
            this.longTermRetentionDeductionRate = 0.1;
          } else if (this.form.value.holdingPeriod < 7) {
            this.longTermRetentionDeductionRate = 0.12;
          } else if (this.form.value.holdingPeriod < 8) {
            this.longTermRetentionDeductionRate = 0.14;
          } else if (this.form.value.holdingPeriod < 9) {
            this.longTermRetentionDeductionRate = 0.16;
          } else if (this.form.value.holdingPeriod < 10) {
            this.longTermRetentionDeductionRate = 0.18;
          } else if (this.form.value.holdingPeriod < 11) {
            this.longTermRetentionDeductionRate = 0.2;
          } else if (this.form.value.holdingPeriod < 12) {
            this.longTermRetentionDeductionRate = 0.22;
          } else if (this.form.value.holdingPeriod < 13) {
            this.longTermRetentionDeductionRate = 0.24;
          } else if (this.form.value.holdingPeriod < 14) {
            this.longTermRetentionDeductionRate = 0.26;
          } else if (this.form.value.holdingPeriod < 15) {
            this.longTermRetentionDeductionRate = 0.28;
          } else {
            this.longTermRetentionDeductionRate = 0.3;
          }
        }
      }
    }

    //장기보유특별공제 = [양도가액 - 취득가액] * 공제율
    this.longTermRetentionDeduction =
      (this.sellingPrice - this.buyingPrice) *
      (this.longTermRetentionDeductionRate +
        this.longTermDwellingDeductionRate);

    //양도소득
    this.revenue = this.gains - this.longTermRetentionDeduction;

    //과세표준
    this.taxStandard = this.revenue - this.generalDeduction;

    //세율
    if (this.taxStandard <= 12000000) {
      this.sellingTaxRate = 0.06;
      this.deduction = 0;
    } else if (this.taxStandard <= 46000000) {
      this.sellingTaxRate = 0.15;
      this.deduction = 1080000;
    } else if (this.taxStandard <= 88000000) {
      this.sellingTaxRate = 0.24;
      this.deduction = 5220000;
    } else if (this.taxStandard <= 150000000) {
      this.sellingTaxRate = 0.35;
      this.deduction = 14900000;
    } else if (this.taxStandard <= 300000000) {
      this.sellingTaxRate = 0.38;
      this.deduction = 19400000;
    } else if (this.taxStandard <= 500000000) {
      this.sellingTaxRate = 0.4;
      this.deduction = 25400000;
    } else if (this.taxStandard <= 1000000000) {
      this.sellingTaxRate = 0.42;
      this.deduction = 35400000;
    } else {
      this.sellingTaxRate = 0.45;
      this.deduction = 65400000;
    }

    //다주택 중과세 -> 보유기간 중과세와 비교하여 큰 금액으로 산정
    if (this.form.value.isRegulatedArea) {
      if (this.form.value.multiHome <= 2) {
        this.sellingTaxRate += 0.2;
      } else {
        this.sellingTaxRate += 0.3;
      }
    }

    //보유기간 중과세
    if (this.form.value.holdingPeriod < 1) {
      this.sellingTaxRate = 0.7;

      if (this.form.value.standardPrice > 1200000000) {
        //환산취득가산액 for ravish house
        this.secondarySellingTax =
          this.sellingPrice *
          (this.buyingPrice / this.standardPrice) *
          this.secondarySellingTaxRate;
      }
    } else if (this.form.value.holdingPeriod >= 2) {
      this.sellingTaxRate = 0.6;

      if (this.form.value.holdingPeriod < 5) {
        //환산취득가산액
        this.secondarySellingTax =
          this.sellingPrice *
          (this.buyingPrice / this.standardPrice) *
          this.secondarySellingTaxRate;
      }
    }

    this.sellingTax =
      (this.taxStandard - this.deduction) * this.sellingTaxRate +
      this.secondarySellingTax;
  }
}
