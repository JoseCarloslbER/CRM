import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QUOTES_ROUTES } from './conversion.routes';
import { QuotesComponent } from './quotes/quotes.component';
import { DetailsQuotesComponent } from './details-quotes/details-quotes.component';
import { ModalNewQuoteComponent } from './modal-new-quote/modal-new-quote.component';
import { ConversionComponent } from './conversion.component';


@NgModule({
  declarations: [ConversionComponent, QuotesComponent, DetailsQuotesComponent, ModalNewQuoteComponent],
  imports: [
    CommonModule,
    QUOTES_ROUTES
  ]
})
export class ConversionModule { }
