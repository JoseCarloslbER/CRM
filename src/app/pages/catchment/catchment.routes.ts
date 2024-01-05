import { RouterModule, Routes } from '@angular/router';
import { ProspectsComponent } from './prospects/prospects.component';
import { CatchmentComponent } from './catchment.component';
import { NewProspectComponent } from './new-prospect/new-prospect.component';

const catchmentRoutes: Routes = [
	{
		path: '',
		component: CatchmentComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'prospectos' },
			{
				path: 'prospectos',
				component: ProspectsComponent,
			},
			{
				path: 'nuevo-prospecto',
				component: NewProspectComponent,
			},
		]
	
	}
];

export const CATCHMENT_ROUTES = RouterModule.forChild(catchmentRoutes);