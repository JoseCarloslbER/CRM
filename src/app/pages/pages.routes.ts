import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const pageRoutes: Routes = [
	{
		path: '',
		component: PagesComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'dashboard' },
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
			},
			{
				path: 'captacion',
				loadChildren: () => import('./catchment/catchment.module').then((m) => m.CatchmentModule),
			},
			{
				path: 'conversion',
				loadChildren: () => import('./conversion/conversion.module').then((m) => m.ConversionModule),
			},
			{
				path: 'configuracion',
				loadChildren: () => import('./config/config.module').then((m) => m.ConfigModule),
			},
		],
	},
];

export const PAGE_ROUTES = RouterModule.forChild(pageRoutes);