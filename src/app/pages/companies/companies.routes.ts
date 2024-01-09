import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { ProspectsComponent } from './prospects/prospects.component';
import { LeadsComponent } from './leads/leads.component';
import { ClientsComponent } from './clients/clients.component';
import { CompaniesComponent } from './companies.component';
import { NewClientComponent } from './all/new-client/new-client.component';
import { DetailClientComponent } from './all/detail-client/detail-client.component';


const companiesRoutes: Routes = [
	{
		path: '',
		component: CompaniesComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'todos' },
			{
				path: 'todos',
				component: AllComponent,
			},
			{
				path: 'nuevo-cliente',
				component: NewClientComponent,
			},
			{
				path: 'detalle-cliente/:id',
				component: DetailClientComponent,
			},
			{
				path: 'prospectos',
				component: ProspectsComponent,
			},
			{
				path: 'nuevo-prospecto',
				component: NewClientComponent,
			},
			{
				path: 'leads',
				component: LeadsComponent,
			},
			{
				path: 'clientes',
				component: ClientsComponent,
			},
		
		]
	
	}
];

export const COMPANIES_ROUTES = RouterModule.forChild(companiesRoutes);