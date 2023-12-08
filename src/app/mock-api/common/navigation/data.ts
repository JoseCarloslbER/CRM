/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id      : '1',
        title   : 'CAPTACIÓN',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'dashboards.project',
                title: 'Prospectos',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboards/project',
            },
            {
                id   : 'dashboards.analytics',
                title: 'Leads',
                type : 'basic',
                icon : 'manage_accounts',
                link : '/dashboards/analytics',
            },
            {
                id   : 'dashboards.finance',
                title: 'Clientes',
                type : 'basic',
                icon : 'heroicons_outline:banknotes',
                link : '/dashboards/finance',
            },
            
        ],
    },
    {
        id      : '2',
        title   : 'DASHBOARDS',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'dashboards.project',
                title: 'Principal',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboards/project',
            },
            {
                id   : 'dashboards.analytics',
                title: 'Pipeline',
                type : 'basic',
                icon : 'manage_accounts',
                link : '/dashboards/analytics',
            },
        ],
    },
    {
        id      : '3',
        title   : 'CONVERSIÓN',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'dashboards.project',
                title: 'Cotizaciones',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboards/project',
            },
        ],
    },
    {
        id      : '4',
        title   : 'ADQUISICIÓN',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'dashboards.project',
                title: 'Empresas',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboards/project',
            },
        ],
    },
    {
        id      : '5',
        title   : 'REACTIVACIÓN',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'dashboards.project',
                title: 'Campañas',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboards/project',
            },
            {
                id   : 'dashboards.project',
                title: 'Llamadas',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboards/project',
            },
        ],
    },
    {
        id      : '6',
        title   : 'GESTIÓN',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'dashboards.project',
                title: 'Actividades',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboards/project',
            },
            {
                id   : 'dashboards.project',
                title: 'Admin',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboards/project',
            },
            {
                id   : 'dashboards.project',
                title: 'Config',
                type : 'basic',
                icon : 'heroicons_outline:chart-pie',
                link : '/dashboards/project',
            },
        ],
    },
];
