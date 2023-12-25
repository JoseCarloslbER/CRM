import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { AcquisitionComponent } from './acquisition.component';
import { DetailClientComponent } from './companies/detail-client/detail-client.component';

const acquisitionRoutes: Routes = [
	{
		path: '',
		component: AcquisitionComponent,
		children: [
			{
				path: 'clientes',
				component: CompaniesComponent,
			},
			{
				path: 'detalle-cliente/:id',
				component: DetailClientComponent,
			},
		]
	
	}
];

export const ACQUISITION_ROUTES = RouterModule.forChild(acquisitionRoutes);