import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { FuseNavigationItem, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
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
    imports: [RouterModule, FuseLoadingBarComponent, FuseVerticalNavigationComponent, NotificationsComponent, UserComponent, NgIf, MatIconModule, MatButtonModule, SearchComponent, ShortcutsComponent, MessagesComponent, RouterOutlet],
})
export class LayoutComponent implements OnInit, OnDestroy {

    public menu: FuseNavigationItem[] = [
        {
            id: "1",
            title: "CAPTACIÓN",
            type: "group",
            children: [
                {
                    id: "1",
                    title: "Campañas",
                    type: "basic",
                    icon: "mat_outline:assignment",
                    link: "/home/captacion/campañas"
                },
            ]
        },
        {
            id: "2",
            title: "DASHBOARDS",
            type: "group",
            icon: "heroicons_outline:home",
            children: [
                {
                    id: "1",
                    title: "Principal",
                    type: "basic",
                    icon: "mat_solid:tune",
                    link: "/home/dashboard/principal"
                },
                {
                    id: "2",
                    title: "Pipeline",
                    type: "basic",
                    icon: "feather:repeat",
                    link: "/home/dashboard/pipeline"
                },
                {
                    id: "3",
                    title: "Campañas",
                    type: "basic",
                    icon: "mat_outline:storefront",
                    link: "/home/dashboard/campañas"
                },
                {
                    id: "4",
                    title: "Metas",
                    type: "basic",
                    icon: "mat_outline:groups",
                    link: "/home/dashboard/metas"
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
                    id: "1",
                    title: "Cotizaciones",
                    type: "basic",
                    link: "/home/conversion/cotizaciones",
                    icon: 'mat_outline:lightbulb'
                }
            ]
        },
        {
            id: "4",
            title: "EMPRESAS",
            type: "group",
            icon: "heroicons_outline:home",
            children: [
                {
                    id   : '1',
                    title: 'Todos',
                    type : 'basic',
                    iconGoogleFonts:'handshake',
                    link : '/home/empresas/todos',
                },
                {
                    id   : '1',
                    title: 'Prospectos',
                    type : 'basic',
                    icon:'mat_outline:how_to_reg',
                    link : '/home/empresas/prospectos'
                },
                {
                    id   : '2',
                    title: 'Leads',
                    type : 'basic',
                    icon: "mat_outline:manage_accounts",
                    link : '/home/empresas/leads'
                },
                {
                    id   : '2',
                    title: 'Clientes',
                    type : 'basic',
                    iconGoogleFonts:"supervisor_account",
                    link : '/home/empresas/clientes'
                },

            ]
        },
        {
            id: "5",
            title: "REACTIVACIÓN",
            type: "group",
            icon: "heroicons_outline:home",
            children: [
                {
                    id: "1",
                    title: "Llamadas pendientes",
                    type: "basic",
                    icon: "mat_outline:phone_missed",
                    link: "/home/reactivacion/llamadas-pendientes",

                },
                {
                    id: "2",
                    title: "Agenda",
                    type: "basic",
                    icon: "mat_outline:view_agenda",
                    link: "/home/reactivacion/agenda",

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
                    id: "1",
                    title: "Actividades",
                    type: "basic",
                    icon: "mat_solid:format_list_bulleted",
                    link: "/home/gestion/actividades",
                },
                {
                    id      : '2',
                    title   : 'Admin',
                    type    : 'collapsable',
                    iconGoogleFonts : 'language',
                    children: [
                        {
                            id   : '1',
                            title: 'Bonos',
                            type : 'basic',
                            link : '/home/admin/bonos'
                        },
                        {
                            id   : '2',
                            title: 'Usuarios',
                            type : 'basic',
                            link : '/home/admin/usuarios'
                        },
                        {
                            id   : '3',
                            title: 'Productos',
                            type : 'basic',
                            link : '/home/admin/productos'
                        },
                        {
                            id   : '4',
                            title: 'Descargar correos',
                            type : 'basic',
                            link : '/home/admin/descarga-correos'
                        },
                    ],
                },
                {
                    id      : '2',
                    title   : 'Categorías',
                    type    : 'collapsable',
                    icon    : 'mat_outline:settings',
                    children: [
                        {
                            id   : '1',
                            title: 'Tipos de actividad',
                            type : 'basic',
                            link : '/home/configuracion/tipo-actividad'
                        },
                        {
                            id   : '2',
                            title: 'Formas de pago',
                            type : 'basic',
                            link : '/home/configuracion/forma-pago'
                        },
                        {
                            id   : '3',
                            title: 'Categorias de productos',
                            type : 'basic',
                            link : '/home/configuracion/categoria-producto'
                        },
                        {
                            id   : '4',
                            title: 'Empresas',
                            type : 'basic',
                            link : '/home/configuracion/categoria-cliente'
                        },
                        {
                            id   : '4',
                            title: 'Tipos campañas',
                            type : 'basic',
                            link : '/home/configuracion/categoria-campaña'
                        },
                    ],
                }
            ]
        }
    ]

    isScreenSmall: boolean;
    user: any;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _fuseNavigationService: FuseNavigationService,
        private router:Router
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

    public goMailbox() {
        this.router.navigateByUrl('/home/reactivacion/correos')
    }
  
    public gocalendar() {
        this.router.navigateByUrl('/home/reactivacion/agenda')
    }
}
