import { RouterModule, Routes } from '@angular/router';
import { CatchmentComponent } from './catchment.component';
import { CampaignsComponent } from './campaigns/campaigns.component';

const catchmentRoutes: Routes = [
	{
		path: '',
		component: CatchmentComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'prospectos' },
			{
				path: 'campanias',
				component: CampaignsComponent,
			},

		]
	
	}
];

export const CATCHMENT_ROUTES = RouterModule.forChild(catchmentRoutes);