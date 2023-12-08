import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

export const appRoutes: Route[] = [
    { path: '', pathMatch : 'full', redirectTo: 'home' },
    // { path: '', pathMatch : 'full', redirectTo: 'home/catchment/prospects' },
    { 
        path: 'home', 
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule) 
    }
];
