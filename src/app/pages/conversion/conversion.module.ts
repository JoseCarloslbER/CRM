import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QUOTES_ROUTES } from './conversion.routes';
import { QuotesComponent } from './quotes/quotes.component';
import { ModalNewQuoteComponent } from './modal-new-quote/modal-new-quote.component';
import { ConversionComponent } from './conversion.component';
import { MaterialModule } from 'app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NewQuoteComponent } from './new-quote/new-quote.component';
import { DetailsQuotesComponent } from './details-quotes/details-quotes.component';


@NgModule({
  declarations: [
    ConversionComponent, 
    DetailsQuotesComponent,
    QuotesComponent, 
    ModalNewQuoteComponent,
    NewQuoteComponent
  ],
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
