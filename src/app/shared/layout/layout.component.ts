import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
    imports: [FuseLoadingBarComponent, FuseVerticalNavigationComponent, NotificationsComponent, UserComponent, NgIf, MatIconModule, MatButtonModule, SearchComponent, ShortcutsComponent, MessagesComponent, RouterOutlet],
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
                    title: "Prospectos",
                    type: "basic",
                    icon: "feather:user-check",
                    link: "/home/captacion/prospectos"
                },
                {
                    id: "2",
                    title: "Leads",
                    type: "basic",
                    icon: "manage_accounts",
                    link: "/dashboards/analytics"
                },
                {
                    id: "3",
                    title: "Clientes",
                    type: "basic",
                    icon: "heroicons_mini:user-group",
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
                    title: "Actividades por agente",
                    type: "basic",
                    icon: "mat_outline:groups",
                    link: "/home/dashboard/actividades-agente"
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
                    iconGoogleFonts : 'lightbulb'

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
                    id      : '1',
                    title   : 'Empresas',
                    type    : 'collapsable',
                    iconGoogleFonts: 'handshake',
                    children: [
                        {
                            id   : '1',
                            title: 'Empresas',
                            type : 'basic',
                            link : '/home/adquisicion/empresas',
                        },
                        {
                            id   : '1',
                            title: 'Carga masiva',
                            type : 'basic',
                            link : ''
                        },
                        {
                            id   : '2',
                            title: 'Descargar correos',
                            type : 'basic',
                            link : ''
                        },
                    ],
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
                    title: "Campañas",
                    type: "basic",
                    icon: "mat_outline:assignment",
                    link: ""
                },
                {
                    id: "2",
                    title: "Llamadas",
                    type: "basic",
                    icon: "mat_outline:local_phone",
                    link: ""
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
                    link: ""
                },
                {
                    id      : '2',
                    title   : 'Admin',
                    type    : 'collapsable',
                    iconGoogleFonts : 'language',
                    children: [
                        {
                            id   : '1',
                            title: 'Plan de trabajo',
                            type : 'basic',
                            link : ''
                        },
                        {
                            id   : '2',
                            title: 'Bonos',
                            type : 'basic',
                            link : ''
                        },
                        {
                            id   : '3',
                            title: 'Ventas por agente',
                            type : 'basic',
                            link : ''
                        },
                    ],
                },
                {
                    id      : '2',
                    title   : 'Config',
                    type    : 'collapsable',
                    icon    : 'mat_outline:settings',
                    children: [
                        {
                            id   : '1',
                            title: 'Usuarios',
                            type : 'basic',
                            link : ''
                        },
                        {
                            id   : '2',
                            title: 'Tipo de actividad',
                            type : 'basic',
                            link : ''
                        },
                        {
                            id   : '3',
                            title: 'Productos',
                            type : 'basic',
                            link : '/home/configuracion/productos'
                        },
                        {
                            id   : '4',
                            title: 'Precio lugar',
                            type : 'basic',
                            link : ''
                        },
                        {
                            id   : '4',
                            title: 'Forma de pago',
                            type : 'basic',
                            link : ''
                        },
                        {
                            id   : '4',
                            title: 'Categorias',
                            type : 'basic',
                            link : ''
                        },
                        {
                            id   : '4',
                            title: 'Empresas',
                            type : 'basic',
                            link : ''
                        },
                        {
                            id   : '4',
                            title: 'Campañas',
                            type : 'basic',
                            link : ''
                        },
                        {
                            id   : '4',
                            title: 'Documentos',
                            type : 'basic',
                            link : ''
                        }
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
