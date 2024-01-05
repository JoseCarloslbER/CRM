import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { GoalsComponent } from './goals/goals.component';
import { CampaignsComponent } from './campaigns/campaigns.component';

const dashboardRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'principal' },
			{
				path: 'principal',
				component: HomeComponent,
			},
			{
				path: 'pipeline',
				component: PipelineComponent,
			},
			{
				path: 'metas',
				component: GoalsComponent,
			},
			{
				path: 'campañias',
				component: CampaignsComponent,
			},
		]
	
	}
];

export const DASHBOARD_ROUTES = RouterModule.forChild(dashboardRoutes);