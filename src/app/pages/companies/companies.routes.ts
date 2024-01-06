import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { NewProspectComponent } from './prospects/new-prospect/new-prospect.component';
import { ProspectsComponent } from './prospects/prospects.component';
import { LeadsComponent } from './leads/leads.component';
import { ClientsComponent } from './clients/clients.component';
import { CompaniesComponent } from '../acquisition/companies/companies.component';


const companiesRoutes: Routes = [
	{
		path: '',
		component: CompaniesComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'todos' },
			{
				path: 'todos',
				component: CompaniesComponent,
			},
			{
				path: 'prospectos',
				component: ProspectsComponent,
			},
			{
				path: 'nuevo-prospecto',
				component: NewProspectComponent,
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