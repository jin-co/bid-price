import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './components/taxes/calculator/calculator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputComponent } from './components/shared/input/input.component';
import { OutputComponent } from './components/shared/output/output.component';
import { AcquisitionTaxComponent } from './components/acquisition-tax/acquisition-tax.component';
import { LoginComponent } from './components/auth/login/login.component';
import { JoinComponent } from './components/auth/join/join.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { TaxModule } from './components/taxes/tax.module';
import { SharedModule } from './components/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JoinComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,   
    TaxModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
