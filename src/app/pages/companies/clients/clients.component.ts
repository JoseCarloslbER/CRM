import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CompaniesService } from '../companies.service';
import * as entity from '../companies-interface';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import moment from 'moment'
import { CatalogsService } from 'app/shared/services/catalogs.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'companyName',
    'status',
    'country',
    'origin',
    'category',
    'business',
    'campaing',
    'quotes',
    'sales',
    'lastContactDate',
    'history',
    'acciones'
  ];

  public formFilters = this.formBuilder.group({
    status: [{ value: '', disabled: false }],
    business: [{ value: '', disabled: false }],
    campaign: [{ value: '', disabled: false }],
    rangeDateStart: [{ value: '', disabled: false }],
    rangeDateEnd: [{ value: '', disabled: false }],
  });

  public catBusiness: entityGeneral.DataCatBusiness[] = [];
  public catStatus: entityGeneral.DataCatStatus[] = [];
  public catCampaing: entityGeneral.DataCatCampaing[] = [];

  public searchBar = new FormControl('')

  public url = document.location.href;
  public title: string = 'cliente';

  public fechaHoy = new Date();

  constructor(
    private moduleServices: CompaniesService,
    private catalogsServices: CatalogsService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchWithFilters();
    this.getCatalogs()
  }

  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      this.applyFilter(content); 
    })
  }

  getCatalogs() {
    this.catalogsServices.getCatBusiness().subscribe({
      next: (data: entityGeneral.DataCatBusiness[]) => {
        this.catBusiness = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatStatus('module_id=1').subscribe({
      next: (data: entityGeneral.DataCatStatus[]) => {
        this.catStatus = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCampaing().subscribe({
      next: (data: entityGeneral.DataCatCampaing[]) => {
        this.catCampaing = data;
      },
      error: (error) => console.error(error)
    });
  }

  searchWithFilters() {
    let filters = 'company_phase=d1203730-3ac8-4f06-b095-3ec56ef3b54d&';

    if (this.formFilters.get('status').value) filters += `status_id=${this.formFilters.get('status').value}&`;
    if (this.formFilters.get('business').value) filters += `business_id=${this.formFilters.get('business').value}&`;
    if (this.formFilters.get('campaign').value) filters += `campaign_id=${this.formFilters.get('campaign').value}&`;
    if (this.formFilters.get('rangeDateStart').value && this.formFilters.get('rangeDateEnd').value) {
      filters += `register_date_start=${moment(this.formFilters.get('rangeDateStart').value).format('YYYY-MM-DD')}&`,
        filters += `register_date_end=${moment(this.formFilters.get('rangeDateEnd').value).format('YYYY-MM-DD')}&`
    }

    this.getDataTable(filters)
  }

  getDataTable(filters?: string) {
    this.moduleServices.getDataTable(filters).subscribe({
      next: (data: entity.TableDataCompanyMapper[]) => {
        console.log(data);
        this.dataSource.data = data;
      },
      error: (error) => console.error(error)
    })
  }

  seeData(id: string) {
    this.router.navigateByUrl(`home/empresas/detalles-empresa/${id}`)
  }

  newData() {
    this.router.navigateByUrl(`/home/empresas/nuevo-cliente`)
  }

  editData(id: string) {
    this.router.navigateByUrl(`/home/empresas/editar-cliente/${id}`)
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteData(id: string) {
    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estás seguro de eliminar el registro?',
        'question',
      )
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.moduleServices.deleteData(id).subscribe({
            next: () => {
              this.notificationService
                .notificacion(
                  'Éxito',
                  'Registro eliminado.',
                  'delete',
                )
                .afterClosed()
                .subscribe((_) => this.searchWithFilters());
            },
            error: (error) => console.error(error)
          })
        }
      });
  }

  douwnloadExel(id?: string) {
    // this.moduleServices.excel('all',id).pipe(takeUntil(this.onDestroy)).subscribe({
    //   next: (_) => {
    //     this.notificationService
    //       .notificacion(
    //         'Éxito',
    //         'Excel descargado.',
    //         'save',
    //         'heroicons_outline:document-arrow-down'
    //       )
    //       .afterClosed()
    //       .subscribe((_) => {

    //       });
    //   },
    //   error: (error) => console.error(error)
    // })


    this.notificationService
      .notificacion(
        'Éxito',
        'Excel descargado.',
        'save',
        'heroicons_outline:document-arrow-down'
      )
      .afterClosed()
      .subscribe((_) => {

      });
  }

  downloadBulkUpload(id?: string) {
    // this.moduleServices.bulkLoad('client', id).pipe(takeUntil(this.onDestroy)).subscribe({
    //   next: (_) => {
    //     this.notificationService
    //       .notificacion(
    //         'Éxito',
    //         'Carga masiva.',
    //         'save',
    //         'mat_solid:downloading'
    //       )
    //       .afterClosed()
    //       .subscribe((_) => { });
    //   },
    //   error: (error) => console.error(error)
    // })

    this.notificationService
      .notificacion(
        'Éxito',
        'Carga masiva.',
        'save',
        'mat_solid:downloading'
      )
      .afterClosed()
      .subscribe((_) => {

      });
  }

  async() {
    // this.moduleServices.asyncProspects('').pipe(takeUntil(this.onDestroy)).subscribe({
    //   next: (_) => {
    //     this.notificationService
    //       .notificacion(
    //         'Éxito',
    //         'Sincronización.',
    //         'save',
    //         'mat_solid:sync'
    //       )
    //       .afterClosed()
    //       .subscribe((_) => {

    //       });
    //   },
    //   error: (error) => console.error(error)
    // })

    this.notificationService
      .notificacion(
        'Éxito',
        'Sincronización.',
        'save',
        'mat_solid:sync'
      )
      .afterClosed()
      .subscribe((_) => {

      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
