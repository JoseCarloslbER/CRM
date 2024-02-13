import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CompaniesService } from '../companies.service';
import { DataTable, DataTableFilters } from '../companies-interface';
import * as entity from '../companies-interface';
import * as entityGeneral from '../../../shared/interfaces/general-interface';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'name',
    'estatus',
    'country',
    'origin',
    'category',
    'giro',
    'campaign',
    'cotizaciones',
    'ventas',
    'fechaUltimoContacto',
    'history',
    'actions',
  ];

  public dataDummy: any[] = [
    {
      estatus: 'PROSPECTO',
      country: 'México',
      category: 'Micro',
      giro: 'Construccion',
      campaign: 'Activa',
      cotizaciones: [
        {
          up: '5',
          bottom: '$15,000.00',

        }
      ],

      ventas: [
        {
          up: '5',
          bottom: '$15,000.00',

        }
      ],

      history: 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      origen: 'Referencia',
      fechaUltimoContacto: '2022-02-28',
    },
    {
      estatus: 'PROSPECTO',
      country: 'México',
      category: 'Micro',
      giro: 'Construccion',
      campaign: 'Activa',
      cotizaciones: [
        {
          up: '5',
          bottom: '$15,000.00',

        }
      ],

      ventas: [
        {
          up: '5',
          bottom: '$15,000.00',

        }
      ],

      history: 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      origen: 'Referencia',
      fechaUltimoContacto: '2022-02-28',
    },
    {
      estatus: 'PROSPECTO',
      country: 'México',
      category: 'Micro',
      giro: 'Construccion',
      campaign: 'Activa',
      cotizaciones: [
        {
          up: '5',
          bottom: '$15,000.00',

        }
      ],

      ventas: [
        {
          up: '5',
          bottom: '$15,000.00',

        }
      ],

      history: 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      origen: 'Referencia',
      fechaUltimoContacto: '2022-02-28',
    },
    {
      estatus: 'PROSPECTO',
      country: 'México',
      category: 'Micro',
      giro: 'Construccion',
      campaign: 'Activa',
      cotizaciones: [
        {
          up: '5',
          bottom: '$15,000.00',

        }
      ],

      ventas: [
        {
          up: '5',
          bottom: '$15,000.00',

        }
      ],

      history: 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      origen: 'Referencia',
      fechaUltimoContacto: '2022-02-28',
    },
    {
      estatus: 'PROSPECTO',
      country: 'México',
      category: 'Micro',
      giro: 'Construccion',
      campaign: 'Activa',
      cotizaciones: [
        {
          up: '5',
          bottom: '$15,000.00',

        }
      ],

      ventas: [
        {
          up: '5',
          bottom: '$15,000.00',

        }
      ],

      history: 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      origen: 'Referencia',
      fechaUltimoContacto: '2022-02-28',
    },
  ]



  public formFilters = this.formBuilder.group({
    status: [{ value: null, disabled: false }],
    business: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  public catBusiness: entityGeneral.DataCatBusiness[] = [];

  public fechaHoy = new Date();

  public searchBar = new FormControl('')

  constructor(
    private moduleServices: CompaniesService,
    private notificationService: OpenModalsService,
    private openModalsService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
  }

  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      console.log(content);
    })

    setTimeout(() => {
      this.getCatalogs()
    }, 500);
  }

  searchWithFilters() {
    let objFilters: any = {
      ...this.formFilters.value
    }

    this.getDataTable(objFilters)
  }

  getCatalogs() {
    this.moduleServices.getCatalogBusiness().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatBusiness[]) => {
        this.catBusiness = data;
      },
      error: (error) => console.error(error)
    });
  }

  getDataTable(filters: DataTableFilters) {
    this.moduleServices.getDataTable('client', filters).subscribe({
      next: ({ data }: DataTable) => {
        console.log(data);
      },
      error: (error) => console.error(error)
    }
    )
  }

  editData(data: any) {
    this.router.navigateByUrl(`/home/empresas/nuevo-prospecto`)
  }

  seeData(data: any) {
    this.router.navigateByUrl(`home/adquisicion/detalle-empresa/1`)
  }

  newData() {
    this.router.navigateByUrl(`/home/empresas/nuevo-cliente`)
  }

  deleteData(id?:string) {
    // this.notificationService
    //   .notificacion(
    //     'Pregunta',
    //     '¿Estas seguro de eliminar el registro?',
    //     'question',
    //   )
    //   .afterClosed()
    //   .subscribe((resp) => {
    //     if (resp) {
    //       this.moduleServices.deleteData('client', id).pipe(takeUntil(this.onDestroy)).subscribe({
    //         next: (_) => {
    //           this.notificationService
    //           .notificacion(
    //             'Éxito',
    //             'Registro eliminado.',
    //             'delete',
    //           )
    //           .afterClosed()
    //           .subscribe((_) => {

    //           });
    //         },
    //         error: (error) => console.error(error)
    //       })
          this.notificationService
            .notificacion(
              'Éxito',
              'Registro eliminado.',
              'delete',
            )
            .afterClosed()
            .subscribe((_) => { });
    //     }
    //   });
  }

  douwnloadExel(id?:string) {
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

  downloadBulkUpload(id?:string) {
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

  get cantSearch() : boolean {
    let cantSearch : boolean = true
    if (
      this.formFilters.get('status').value  ||
      this.formFilters.get('giro').value ||
      this.formFilters.get('company').value ||
      this.formFilters.get('rangeDateStart').value && !this.formFilters.get('status').value 
      ) {
      cantSearch = false;
    }

    return cantSearch
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
