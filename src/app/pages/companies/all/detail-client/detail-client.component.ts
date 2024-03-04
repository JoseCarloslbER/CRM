import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { Subject, takeUntil } from 'rxjs';
import { CompaniesService } from '../../companies.service';


@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.scss'
})
export class DetailClientComponent implements OnInit {
  private onDestroy = new Subject<void>();


  public dataSourceQuotes = new MatTableDataSource<any>([]);
  public dataSourceCampaign = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  @ViewChild('contactTab') contactTab: ElementRef;

  selectedTabIndex = 0;

  public displayedColumns: string[] = [
    'empresa',
    'fecha',
    'folio',
    'precioTotal',
    'nivelInteres',
    'estadopais',
    'estatus',
    'agente',
    'lugares',
    'actividades',
    'agregarOpciones',
    'modificarEstatus',
    'acciones',
  ];

  public dataDummy: any[] = [
    {
      empresa: 'RECK SOLUCIONES',
      fecha: '2023-09-30 12:38:49',
      folio: '#123345',
      precioTotal: '$4,000,000.00',
      nivelInteres: 'Alto',
      estatus: 'LEAD',
      agente: 'Atendió: Marketing',
      estadopais: 'Mexico, Nuevo Leon',
      actividades: 'Ver historial',
      lugares: [
        {
          no: '1548',
          tipo: 'Lista',
          lugares: '5',
          curso: 'C029 - Seguridad en el mantenimiento de instalaciones eléctrica',
          precio: '$1,995.00',
        }
      ],
    },
    {
      empresa: 'RECK SOLUCIONES',
      fecha: '2023-09-30 12:38:49',
      folio: '#123345',
      precioTotal: '$4,000,000.00',
      nivelInteres: 'Alto',
      estatus: 'LEAD',
      agente: 'Atendió: Marketing',
      estadopais: 'Mexico, Nuevo Leon',
      actividades: 'Ver historial',
      lugares: [
        {
          no: '1548',
          tipo: 'Lista',
          lugares: '5',
          curso: 'C029 - Seguridad en el mantenimiento de instalaciones eléctrica',
          precio: '$1,995.00',
        }
      ],
    },
    {
      empresa: 'RECK SOLUCIONES',
      fecha: '2023-09-30 12:38:49',
      folio: '#123345',
      precioTotal: '$4,000,000.00',
      nivelInteres: 'Alto',
      estatus: 'LEAD',
      agente: 'Atendió: Marketing',
      estadopais: 'Mexico, Nuevo Leon',
      actividades: 'Ver historial',
      lugares: [
        {
          no: '1548',
          tipo: 'Lista',
          lugares: '5',
          curso: 'C029 - Seguridad en el mantenimiento de instalaciones eléctrica',
          precio: '$1,995.00',
        }
      ],
    },
    {
      empresa: 'RECK SOLUCIONES',
      fecha: '2023-09-30 12:38:49',
      folio: '#123345',
      precioTotal: '$4,000,000.00',
      nivelInteres: 'Alto',
      estatus: 'LEAD',
      agente: 'Atendió: Marketing',
      estadopais: 'Mexico, Nuevo Leon',
      actividades: 'Ver historial',
      lugares: [
        {
          no: '1548',
          tipo: 'Lista',
          lugares: '5',
          curso: 'C029 - Seguridad en el mantenimiento de instalaciones eléctrica',
          precio: '$1,995.00',
        }
      ],
    },
  ]

  public objEditData: any;


  constructor(
    private moduleServices: CompaniesService,
    private activatedRoute: ActivatedRoute,
    private notificationService: OpenModalsService,

  ) { }

  ngOnInit(): void {
    this.dataSourceQuotes.data = this.dataDummy
    this.getId()
  }

  getId() {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe((params:any) => {
      if (params.id) this.getDataById(params.id);
    });
  }

  getDataById(id:string) {
    this.moduleServices.getDataDetailsCompanyId(id).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: any) => {
        console.log(response);
        this.objEditData = response;
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  selectTab(index: number) {
    this.selectedTabIndex = index;
    this.tabGroup.selectedIndex = index;

    const contactosTabElement = document.getElementById('contactosTab');
    if (contactosTabElement) contactosTabElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
