import { RouterModule, Routes } from '@angular/router';
import { ProspectsComponent } from './prospects/prospects.component';
import { CatchmentComponent } from './catchment.component';

const catchmentRoutes: Routes = [
	{
		path: '',
		// canActivate: [PermisosGuard],
		component: CatchmentComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'prospectos' },
			{
				path: 'prospectos',
				component: ProspectsComponent,
			},
		]
	
	}
];

export const CATCHMENT_ROUTES = RouterModule.forChild(catchmentRoutes);