import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './main-users/users/users.component';
import { MainUsersComponent } from './main-users/main-users.component';
import { BonusesComponent } from './bonuses/bonuses.component';


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
				path: 'bonos',
				component: BonusesComponent,
			},
		
		]
	}
];

export const ADMIN_ROUTES = RouterModule.forChild(adminRoutes);