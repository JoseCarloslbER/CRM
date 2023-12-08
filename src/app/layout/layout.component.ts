import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { MessagesComponent } from 'app/layout/common/messages/messages.component';
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { SearchComponent } from 'app/layout/common/search/search.component';
import { ShortcutsComponent } from 'app/layout/common/shortcuts/shortcuts.component';
import { UserComponent } from 'app/layout/common/user/user.component';
import { Subject, takeUntil } from 'rxjs';


@Component({
    selector     : 'layout',
    templateUrl  : './layout.component.html',
    styleUrls    : ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports: [FuseLoadingBarComponent, FuseVerticalNavigationComponent, NotificationsComponent, UserComponent, NgIf, MatIconModule, MatButtonModule, SearchComponent, ShortcutsComponent, MessagesComponent, RouterOutlet],
    styles: [
        `
        .logo-crm {
            width: 80px
        }
        `
    ]
})
export class LayoutComponent implements OnInit, OnDestroy {
    isScreenSmall: boolean;
    user: User;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

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
    constructor(
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
    ) {
    }

    get currentYear(): number {
        return new Date().getFullYear();
    }

    ngOnInit(): void {
        // Subscribe to the user 
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) => {
                this.user = user;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }


    toggleNavigation(name: string): void {
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if (navigation) {
            navigation.toggle();
        }
    }











}
