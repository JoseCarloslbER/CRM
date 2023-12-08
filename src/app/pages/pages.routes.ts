import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const pageRoutes: Routes = [
	{
		path: '',
		component: PagesComponent,
		children: [
			{
				path: 'catchment',
				loadChildren: () => import('./catchment/catchment.module').then((m) => m.CatchmentModule),
			},
			{
				path: 'conversion',
				loadChildren: () => import('./conversion/conversion.module').then((m) => m.ConversionModule),
			},
		],
	},
];

export const PAGE_ROUTES = RouterModule.forChild(pageRoutes);