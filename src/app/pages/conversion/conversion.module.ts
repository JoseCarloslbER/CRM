import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QUOTES_ROUTES } from './conversion.routes';
import { QuotesComponent } from './quotes/quotes.component';
import { DetailsQuotesComponent } from './details-quotes/details-quotes.component';
import { ModalNewQuoteComponent } from './modal-new-quote/modal-new-quote.component';
import { ConversionComponent } from './conversion.component';
import { MaterialModule } from 'app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [ConversionComponent, QuotesComponent, DetailsQuotesComponent, ModalNewQuoteComponent],
  imports: [
    CommonModule,
    QUOTES_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
  ]
})
export class ConversionModule { }
