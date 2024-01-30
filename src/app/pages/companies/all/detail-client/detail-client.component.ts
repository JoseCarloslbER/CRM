import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.scss'
})
export class DetailClientComponent {
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

  constructor(
    private openModalsService: OpenModalsService,
    private formBuilder: FormBuilder,
    private viewScroller: ViewportScroller,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSourceQuotes.data = this.dataDummy
  }

  selectTab(index: number) {
    this.selectedTabIndex = index;
    this.tabGroup.selectedIndex = index;

      // Obten el elemento con el identificador "contactosTab"
  const contactosTabElement = document.getElementById('contactosTab');

  // Utiliza scrollIntoView para hacer scroll suave hacia el elemento
  if (contactosTabElement) {
    contactosTabElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
