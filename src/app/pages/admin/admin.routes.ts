import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MainUsersComponent } from './main-users/main-users.component';
import { ProductsComponent } from './products/products.component';
import { DownloadEmailsComponent } from './download-emails/download-emails.component';
import { MainBonusesComponent } from './main-bonuses/main-bonuses.component';
import { NewBonoComponent } from './main-bonuses/bonuses/new-bono/new-bono.component';
import { NewUserComponent } from './main-users/users/new-user/new-user.component';
import { NewRolComponent } from './main-users/users-rol/new-rol/new-rol.component';


const adminRoutes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'usuarios' },
			{
				path: 'usuarios',
				component: MainUsersComponent,
			},
			{
				path: 'nuevo-usuario',
				component: NewUserComponent,
			},
			{
				path: 'nuevo-rol',
				component: NewRolComponent,
			},
			{
				path: 'bonos',
				component: MainBonusesComponent,
			},
			{
				path: 'nuevo-bono',
				component: NewBonoComponent,
			},
			{
				path: 'productos',
				component: ProductsComponent,
			},
			{
				path: 'descarga-correos',
				component: DownloadEmailsComponent,
			},
		
		]
	}
];

export const ADMIN_ROUTES = RouterModule.forChild(adminRoutes);