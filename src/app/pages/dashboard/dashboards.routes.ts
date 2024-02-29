import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { GoalsComponent } from './goals/goals.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { NewBonoComponent } from '../admin/main-bonuses/bonuses/new-bono/new-bono.component';
import { NewQuoteOrProspectComponent } from './new-quote-or-prospect/new-quote-or-prospect.component';
import { NewQuoteOrClientComponent } from './new-quote-or-client/new-quote-or-client.component';
import { CampainResultsComponent } from '../catchment/campaigns/campain-results/campain-results.component';
import { NewQuoteComponent } from '../conversion/new-quote/new-quote.component';
import { NewClientOrProspectComponent } from '../companies/new-client-or-prospect/new-client-or-prospect.component';

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
				path: 'nueva-meta',
				component: NewBonoComponent,
			},
			{
				path: 'editar-meta/:id',
				component: NewBonoComponent,
			},
			{
				path: 'campanias',
				component: CampaignsComponent,
			},
			{
				path: 'resultados-campanias/:id',
				component: CampainResultsComponent,
			},
			// {
			// 	path: 'nueva-cotizacion-prospecto',
			// 	component: NewQuoteOrProspectComponent,
			// },
			{
				path: 'nueva-cotizacion-prospecto',
				component: NewClientOrProspectComponent,
			},
			// {
			// 	path: 'nueva-cotizacion-cliente',
			// 	component: NewQuoteOrClientComponent,
			// },
			{
				path: 'nueva-cotizacion-cliente',
				component: NewQuoteComponent,
			},
		]
	
	}
];

export const DASHBOARD_ROUTES = RouterModule.forChild(dashboardRoutes);