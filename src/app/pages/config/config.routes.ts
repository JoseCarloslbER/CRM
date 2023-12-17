import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './config.component';
import { ProductsComponent } from './products/products.component';

const configRoutes: Routes = [
	{
		path: '',
		component: ConfigComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'productos' },
			{
				path: 'productos',
				component: ProductsComponent,
			},
		]
	
	}
];

export const CONFIG_ROUTES = RouterModule.forChild(configRoutes);