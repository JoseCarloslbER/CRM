import { Route } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch : 'full', redirectTo: 'autenticacion' },
    // { path: '', redirectTo: 'autenticacion', pathMatch: 'full' },
    {
		path: 'autenticacion',
		loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
	},
    { 
        path: 'home', 
        component: LayoutComponent,
        loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule) 
    }
];
