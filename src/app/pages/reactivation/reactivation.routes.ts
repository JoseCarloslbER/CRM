import { RouterModule, Routes } from '@angular/router';
import { PendingCallsComponent } from './pending-calls/pending-calls.component';
import { DiaryComponent } from './diary/diary.component';
import { ReactivationComponent } from './reactivation.component';


const reactivationRoutes: Routes = [
	{
		path: '',
		component: ReactivationComponent,
		children: [
			{ path: '', pathMatch : 'full', redirectTo: 'llamadas-pendientes' },
			{
				path: 'llamadas-pendientes',
				component: PendingCallsComponent,
			},
			{
				path: 'agenda',
				component: DiaryComponent,
			},
		]
	}
];

export const REACTIVATION_ROUTES = RouterModule.forChild(reactivationRoutes);