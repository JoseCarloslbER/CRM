import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { ActivitiesAgentComponent } from './activities-agent/activities-agent.component';

const dashboardRoutes: Routes = [
	{
		path: '',
		// canActivate: [PermisosGuard],
		component: DashboardComponent,
		children: [
			{
				path: 'principal',
				component: HomeComponent,
			},
			{
				path: 'pipeline',
				component: PipelineComponent,
			},
			{
				path: 'actividades-agente',
				component: ActivitiesAgentComponent,
			},
		]
	
	}
];

export const DASHBOARD_ROUTES = RouterModule.forChild(dashboardRoutes);