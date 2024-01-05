import { RouterModule, Routes } from '@angular/router';
import { QuotesComponent } from './quotes/quotes.component';
import { ConversionComponent } from './conversion.component';
import { NewQuoteComponent } from './new-quote/new-quote.component';
import { DetailsQuotesComponent } from './details-quotes/details-quotes.component';

const quotesRoutes: Routes = [
	{
		path: '',
		component: ConversionComponent,
		children: [
			{
				path: 'cotizaciones',
				component: QuotesComponent,
			},
			{
				path: 'detalle-cotizacion/:id',
				component: DetailsQuotesComponent,
			},
			{
				path: 'nueva-cotizacion',
				component: NewQuoteComponent,
			},
		]
	
	}
];

export const QUOTES_ROUTES = RouterModule.forChild(quotesRoutes);