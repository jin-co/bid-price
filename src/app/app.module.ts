import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HavingTaxComponent } from './components/having-tax/having-tax.component';
import { CombinedHousingTaxComponent } from './components/combined-housing-tax/combined-housing-tax.component';
import { RentTaxComponent } from './components/rent-tax/rent-tax.component';

@NgModule({
  declarations: [AppComponent, CalculatorComponent, HavingTaxComponent, CombinedHousingTaxComponent, RentTaxComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
