import { NgIf } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
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
import { QuickChatComponent } from './common/quick-chat/quick-chat.component';
import { AuthenticationService } from 'app/authentication/authentication.service';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        QuickChatComponent,
        RouterModule, FuseLoadingBarComponent, FuseVerticalNavigationComponent, NotificationsComponent, UserComponent, NgIf, MatIconModule, MatButtonModule, SearchComponent, ShortcutsComponent, MessagesComponent, RouterOutlet],
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {

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
                    link: "/home/captacion/campanias"
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
                    link: "/home/dashboard/campanias"
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
    userName:string = ''
    photo:string = ''

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private authenticationService: AuthenticationService,
        private _fuseNavigationService: FuseNavigationService,
        private router:Router
    ) { }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.user = this.authenticationService.getDecryptedUser();
            this.userName = this.user?.first_name && this.user?.last_name ? this.user?.first_name.toUpperCase() + ' ' + this.user?.last_name.toUpperCase() : this.user?.username.toUpperCase();
            // this.photo = this.user?.profile_picture
            // ? this.user.profile_picture.includes('default') ? false : this.user.profile_picture
            // : false;            
            this.photo = this.user?.profile_picture ? this.user?.profile_picture.includes('default') ? `../../../assets/images/user-default.png` : this.user?.profile_picture : `../../../assets/images/user-default.png`
        }, 500);
    }

    toggleNavigation(name: string): void {
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);
        if (navigation) navigation.toggle();
    }

    get currentYear(): number {
        return new Date().getFullYear();
    }

    goMailbox() {
        this.router.navigateByUrl('/home/reactivacion/correos')
    }
  
    gocalendar() {
        this.router.navigateByUrl('/home/reactivacion/agenda')
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
