import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MessagesComponent } from './common/messages/messages.component';
import { NotificationsComponent } from './common/notifications/notifications.component';
import { UserComponent } from './common/user/user.component';
import { SearchComponent } from './common/search/search.component';
import { ShortcutsComponent } from './common/shortcuts/shortcuts.component';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [FuseLoadingBarComponent, FuseVerticalNavigationComponent, NotificationsComponent, UserComponent, NgIf, MatIconModule, MatButtonModule, SearchComponent, ShortcutsComponent, MessagesComponent, RouterOutlet],
})
export class LayoutComponent implements OnInit, OnDestroy {

    public menu: any = [
        {
            id: "1",
            title: "CAPTACIÓN",
            type: "group",
            icon: "heroicons_outline:home",
            children: [
                {
                    id: "dashboards.project",
                    title: "Prospectos",
                    type: "basic",
                    icon: "heroicons_outline:chart-pie",
                    link: "/dashboards/project"
                },
                {
                    id: "dashboards.analytics",
                    title: "Leads",
                    type: "basic",
                    icon: "manage_accounts",
                    link: "/dashboards/analytics"
                },
                {
                    id: "dashboards.finance",
                    title: "Clientes",
                    type: "basic",
                    icon: "heroicons_outline:banknotes",
                    link: "/dashboards/finance"
                }
            ]
        },
        {
            id: "2",
            title: "DASHBOARDS",
            type: "group",
            icon: "heroicons_outline:home",
            children: [
                {
                    id: "dashboards.project",
                    title: "Principal",
                    type: "basic",
                    icon: "heroicons_outline:chart-pie",
                    link: "/dashboards/project"
                },
                {
                    id: "dashboards.analytics",
                    title: "Pipeline",
                    type: "basic",
                    icon: "manage_accounts",
                    link: "/dashboards/analytics"
                }
            ]
        },
        {
            id: "3",
            title: "CONVERSIÓN",
            type: "group",
            icon: "heroicons_outline:home",
            children: [
                {
                    id: "dashboards.project",
                    title: "Cotizaciones",
                    type: "basic",
                    icon: "heroicons_outline:chart-pie",
                    link: "/dashboards/project"
                }
            ]
        },
        {
            id: "4",
            title: "ADQUISICIÓN",
            type: "group",
            icon: "heroicons_outline:home",
            children: [
                {
                    id: "dashboards.project",
                    title: "Empresas",
                    type: "basic",
                    icon: "heroicons_outline:chart-pie",
                    link: "/dashboards/project"
                }
            ]
        },
        {
            id: "5",
            title: "REACTIVACIÓN",
            type: "group",
            icon: "heroicons_outline:home",
            children: [
                {
                    id: "dashboards.project",
                    title: "Campañas",
                    type: "basic",
                    icon: "heroicons_outline:chart-pie",
                    link: "/dashboards/project"
                },
                {
                    id: "dashboards.project",
                    title: "Llamadas",
                    type: "basic",
                    icon: "heroicons_outline:chart-pie",
                    link: "/dashboards/project"
                }
            ]
        },
        {
            id: "6",
            title: "GESTIÓN",
            type: "group",
            icon: "heroicons_outline:home",
            children: [
                {
                    id: "dashboards.project",
                    title: "Actividades",
                    type: "basic",
                    icon: "heroicons_outline:chart-pie",
                    link: "/dashboards/project"
                },
                {
                    id: "dashboards.project",
                    title: "Admin",
                    type: "basic",
                    icon: "heroicons_outline:chart-pie",
                    link: "/dashboards/project"
                },
                {
                    id: "dashboards.project",
                    title: "Config",
                    type: "basic",
                    icon: "heroicons_outline:chart-pie",
                    link: "/dashboards/project"
                }
            ]
        }
    ]

    isScreenSmall: boolean;
    user: any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _fuseNavigationService: FuseNavigationService,
    ) { }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    toggleNavigation(name: string): void {
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if (navigation) navigation.toggle();
    }

    get currentYear(): number {
        return new Date().getFullYear();
    }
}
