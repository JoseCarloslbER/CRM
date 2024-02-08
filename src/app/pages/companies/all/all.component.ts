import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CompaniesService } from '../companies.service';
import { DataTable, DataTableFilters } from '../companies-interface';
import * as entity from '../companies-interface';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent  implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
	public dataSourceAgregadosRecientemente = new MatTableDataSource<any>([]);
	public dataSourceMasComprados = new MatTableDataSource<any>([]);
	@ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
	public total = 0;
	public indicePagina = 0;

  public displayedColumnsMascomprados: string[] = ['empresa', 'fechaRegistro', 'monto' ];
  public displayedColumnsAgregadasRecientemente: string[] = ['empresa', 'estatus', 'fechaRegistro', 'monto' ];
  public displayedColumns: string[] = [
    'client',
    'status', 
    'country',
    'origen',
    'categoria', 
    'giro', 
    'campaign', 
    'cotizaciones', 
    'ventas', 
    'fechaUltimoContacto', 
    'history', 
    'acciones'
  ];

  public dataDummy : any[] = [
    {
      estatus : 'LEAD',
      pais : 'México',
      giro : 'Construcción',
      campaign : 'Activa',
      history : 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      categoria : 'LEAD',
      cotizaciones : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],
      ventas : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],
      origen : 'Referencia',
      fechaUltimoContacto : '2022-02-28',
      fechaVencimiento : '2022-02-28',
    },
    {
      estatus : 'CLIENTE',
      pais : 'México',
      giro : 'Construcción',
      campaign : 'Activa',
      history : 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      categoria : 'LEAD',
      cotizaciones : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],
      ventas : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],
      origen : 'Referencia',
      fechaUltimoContacto : '2022-02-28',
      fechaVencimiento : '2022-02-28',
    },
    {
      estatus : 'AllOS',
      pais : 'México',
      giro : 'Construcción',
      campaign : 'Activa',
      history : 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      categoria : 'LEAD',
      cotizaciones : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],
      ventas : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],
      origen : 'Referencia',
      fechaUltimoContacto : '2022-02-28',
      fechaVencimiento : '2022-02-28',
    },
  
    
  ]

  public datosAgregadosRecientemente : any[] = [
    {
      empresa : 'Seguridad privada S.A. de S.V.',
      estatus : 'Abierto',
      fechaRegistro : '2020-03-28',
      monto : '$1,000,000.00',
    }
  ]
  
  public datosMascomprados : any[] = [
    {
      empresa : 'Seguridad privada S.A. de S.V.',
      fechaRegistro : '2020-03-28',
      monto : '$1,000,000.00',
    }
  ]


  public formFilters = this.formBuilder.group({
    status: [{ value: null, disabled: false }],
    giro: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  public catBusiness: entity.DataCatBusiness[] = [];

  public searchBar = new FormControl('')

  public selectedProject: string = 'todas';

	public fechaHoy = new Date();

  constructor(
    private moduleServices: CompaniesService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cambiarOpcion('todas')
   }

   ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content:string) => {
      console.log(content);
    })

    setTimeout(() => {
      this.getCatalogs()
    }, 500);
   }

  searchWithFilters(){
    let objFilters:any = {
      ...this.formFilters.value
    }

    this.getDataTable(objFilters)  
  }

  getCatalogs() {
    this.moduleServices.getCatalogBusiness().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entity.DataCatBusiness[]) => {
        this.catBusiness = data;
      },
      error: (error) => console.error(error)
    });
  }

  getDataTable(filters:DataTableFilters) {
    this.moduleServices.getDataTable('all', filters).subscribe({
        next: ({ data } : DataTable) => {
          console.log(data);
        },
        error: (error) => console.error(error)
      }
    )
  }

  seeClient(data:any) {
    this.router.navigateByUrl(`/home/empresas/detalle-cliente/${1}`)
  }

  newData() {
    this.router.navigateByUrl(`/home/empresas/todos-nuevo-cliente`)
  }

  editData(data: any) {
    this.router.navigateByUrl(`/home/empresas/editar-cliente/1`)
  }

  seeData(data: any) {
    this.router.navigateByUrl(`home/empresas/detalle-cliente/1`)
  }

  cambiarOpcion(opcion : string) {
    if (opcion == 'todas') { 
      this.dataSource.data = this.dataDummy
      this.selectedProject = 'Todas'
    } else if (opcion == 'agregadasRecientemente'){
      this.selectedProject = 'Agregadas recientemente'
      this.dataSourceAgregadosRecientemente.data = this.datosAgregadosRecientemente
    } else {
      this.selectedProject = 'Más comprados'
      this.dataSourceMasComprados.data = this.datosMascomprados
    }
   }

  deleteData(id?:string) {
    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estas seguro de eliminar el registro?',
        'question',
      )
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          // this.moduleServices.deleteData('all', id).pipe(takeUntil(this.onDestroy)).subscribe({
          //   next: (_) => {
          //     this.notificationService
          //     .notificacion(
          //       'Éxito',
          //       'Registro eliminado.',
          //       'delete',
          //     )
          //     .afterClosed()
          //     .subscribe((_) => {

          //     });
          //   },
          //   error: (error) => console.error(error)
          // })
          this.notificationService
            .notificacion(
              'Éxito',
              'Registro eliminado.',
              'delete',
            )
            .afterClosed()
            .subscribe((_) => { });
        }
      });
  }

  douwnloadExel(id?:string) {
    this.moduleServices.excel('all', '').pipe(takeUntil(this.onDestroy)).subscribe({
      next: (_) => {
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
      },
      error: (error) => console.error(error)
    })


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

  async(id?:string) {
    this.moduleServices.async('all', id).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (_) => {
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
      },
      error: (error) => console.error(error)
    })

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
