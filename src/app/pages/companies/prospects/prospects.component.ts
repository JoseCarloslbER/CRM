import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CompaniesService } from '../companies.service';
import { DataTable } from '../companies-interface';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-prospects',
  templateUrl: './prospects.component.html',
  styleUrls: []
})
export class ProspectsComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 5;
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
          bottom: '$15,000.000.00',

        }
      ],

      ventas: [
        {
          up: '5',
          bottom: '$15,000.000.00',

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

  public fechaHoy = new Date();

  public searchBar = new FormControl('')

  public formFilters = this.formBuilder.group({
    estatus: [{ value: null, disabled: false }],
    giro: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  constructor(
    private moduleServices: CompaniesService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.dataDummy;

  }

  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content:string) => {
      console.log(content);
    })
  }

  SearchWithFilters() {
    let objFilters:any = {
      ...this.formFilters.value
    }

    this.getDataTable(objFilters)
  }

  getCatalogs() {
    
  }

  getDataTable(filters:Object) {
    this.moduleServices.getDataTable(filters).subscribe({
        next: ({ data } : DataTable) => {
          console.log(data);
        },
        error: (error) => console.error(error)
      }
    )
  }

  editData(data: any) {
    this.router.navigateByUrl(`/home/empresas/editar-prospecto/1`)
  }

  seeData(data: any) {
    this.router.navigateByUrl(`home/empresas/detalle-prospecto/1`)
  }

  newData() {
    this.router.navigateByUrl(`/home/empresas/nuevo-prospecto`)
  }

  deleteData() {
    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estas seguro de eliminar el registro?',
        'question',
      )
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.notificationService
          .notificacion(
            'Éxito',
            'Registro eliminado.',
            'delete',
          )
          .afterClosed()
          .subscribe((_) => {

          });
        }
      });
  }

  douwnloadExel(){
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

  downloadBulkUpload(){
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
