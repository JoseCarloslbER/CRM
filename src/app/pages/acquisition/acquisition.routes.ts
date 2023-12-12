import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { AcquisitionComponent } from './acquisition.component';

const acquisitionRoutes: Routes = [
	{
		path: '',
		// canActivate: [PermisosGuard],
		component: AcquisitionComponent,
		children: [
			{
				path: 'empresas',
				component: CompaniesComponent,
			},
		]
	
	}
];

export const ACQUISITION_ROUTES = RouterModule.forChild(acquisitionRoutes);