import { Route } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch : 'full', redirectTo: 'home' },
    { 
        path: 'home', 
        component: LayoutComponent,
        loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule) 
    }
];
