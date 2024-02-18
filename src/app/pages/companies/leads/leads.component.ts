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

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent implements OnInit, AfterViewInit, OnDestroy {
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
      estatus: 'LEAD',
      country: 'México',
      category: 'Micro',
      giro: 'Construccion',
      campaign: 'Activa',
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

      history: 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      origen: 'Referencia',
      fechaUltimoContacto: '2022-02-28',
    },
    {
      estatus: 'LEAD',
      country: 'México',
      category: 'Micro',
      giro: 'Construccion',
      campaign: 'Activa',
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

      history: 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      origen: 'Referencia',
      fechaUltimoContacto: '2022-02-28',
    },
    {
      estatus: 'LEAD',
      country: 'México',
      category: 'Micro',
      giro: 'Construccion',
      campaign: 'Activa',
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

      history: 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      origen: 'Referencia',
      fechaUltimoContacto: '2022-02-28',
    },
    {
      estatus: 'LEAD',
      country: 'México',
      category: 'Micro',
      giro: 'Construccion',
      campaign: 'Activa',
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

      history: 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      origen: 'Referencia',
      fechaUltimoContacto: '2022-02-28',
    },
    {
      estatus: 'LEAD',
      country: 'México',
      category: 'Micro',
      giro: 'Construccion',
      campaign: 'Activa',
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

      history: 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      origen: 'Referencia',
      fechaUltimoContacto: '2022-02-28',
    },
  ]


  public formFilters = this.formBuilder.group({
    status: [{ value: null, disabled: false }],
    giro: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  public catBusiness: entityGeneral.DataCatBusiness[] = [];

  public searchBar = new FormControl('')
  
  public fechaHoy = new Date();

  constructor(
    private moduleServices: CompaniesService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
  }
  
  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content:string) => {
      console.log(content);
    })
  }

  searchWithFilters() {
    let objFilters: any = {
      ...this.formFilters.value
    }

    this.getDataTable(objFilters)
  }

  getCatalogs() {

  }

  getDataTable(filters?) {
    this.moduleServices.getDataTable('lead', filters).subscribe({
      next: ({ data }: any) => {
        console.log(data);
      },
      error: (error) => console.error(error)
    })
  }


  editData(data:any) {
    this.router.navigateByUrl(`/home/empresas/nuevo-prospecto`)
  }

  seeData(data:any) {
    this.router.navigateByUrl(`home/adquisicion/detalle-empresa/1`)
  }

  deleteData(id?:String) {
    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estas seguro de eliminar el registro?',
        'question',
      )
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          // this.moduleServices.deleteDataProspect(lead', id).pipe(takeUntil(this.onDestroy)).subscribe({
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
    // this.moduleServices.excel('lead', id).pipe(takeUntil(this.onDestroy)).subscribe({
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
