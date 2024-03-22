import { RouterModule, Routes } from '@angular/router';
import { ComunicationsComponent } from './comunications.component';
import { SlackComponent } from './slack/slack.component';
import { TawkComponent } from './tawk/tawk.component';

const comunicationsRoutes: Routes = [
	{
		path: '',
		component: ComunicationsComponent,
		children: [
			{
				path: 'slack',
				component: SlackComponent,
			},
			{
				path: 'tawk',
				component: TawkComponent,
			},
		]
	
	}
];

export const COMUNICATIONS_ROUTES = RouterModule.forChild(comunicationsRoutes);