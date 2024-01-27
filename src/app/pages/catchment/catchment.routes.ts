import { RouterModule, Routes } from '@angular/router';
import { CatchmentComponent } from './catchment.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { NewCampingnComponent } from './campaigns/new-campingn/new-campingn.component';

const catchmentRoutes: Routes = [
	{
		path: '',
		component: CatchmentComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'campañas' },
			{
				path: 'campañas',
				component: CampaignsComponent,
			},
			{
				path: 'nueva-campaña',
				component: NewCampingnComponent,
			},
			{
				path: 'clonar-campaña/:id',
				component: NewCampingnComponent,
			},
			{
				path: 'editar-campaña/:id',
				component: NewCampingnComponent,
			},
		]
	
	}
];

export const CATCHMENT_ROUTES = RouterModule.forChild(catchmentRoutes);