import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator/calculator.component';
import { CombinedHousingTaxComponent } from './combined-housing-tax/combined-housing-tax.component';
import { HavingTaxComponent } from './having-tax/having-tax.component';
import { RentTaxComponent } from './rent-tax/rent-tax.component';
import { SellingTaxComponent } from './selling-tax/selling-tax.component';
import { AcquisitionTaxComponent } from '../acquisition-tax/acquisition-tax.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CalculatorComponent,
    AcquisitionTaxComponent,
    CombinedHousingTaxComponent,
    HavingTaxComponent,
    RentTaxComponent,
    SellingTaxComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  exports: [
    CalculatorComponent,
    AcquisitionTaxComponent,
    CombinedHousingTaxComponent,
    HavingTaxComponent,
    RentTaxComponent,
    SellingTaxComponent,
  ],
})
export class TaxModule {}
