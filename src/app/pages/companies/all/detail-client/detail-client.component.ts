import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ActivatedRoute } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { Subject, takeUntil } from 'rxjs';
import { CompaniesService } from '../../companies.service';
import * as entity from '../../companies-interface';


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

  public selectedTabIndex = 0;

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

  public companyContacts: any[] = [];
  public objEditData: any;

  constructor(
    private moduleServices: CompaniesService,
    private activatedRoute: ActivatedRoute,
    private notificationService: OpenModalsService,

  ) { }

  ngOnInit(): void {
    this.getId()
  }

  getId() {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe((params:any) => {
      if (params.id) this.getDataById(params.id);
    });
  }

  getDataById(id:string) {
    this.moduleServices.getDataDetailsCompanyId(id).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: entity.GetDataDetailsCompanyMapper) => {
        console.log(response);
        this.objEditData = response;
        this.companyContacts = response.companyContacts;
        console.log('companyContacts:', this.companyContacts);
        
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
