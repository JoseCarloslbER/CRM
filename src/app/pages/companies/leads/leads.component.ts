import { Component, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.scss'
})
export class LeadsComponent {
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

  public fechaHoy = new Date();


  public formFilters = this.formBuilder.group({
    estatus: [{ value: null, disabled: false }],
    giro: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
  }

  SearchWithFilters() {
    console.log(this.formFilters.value);
  }

  editData(data:any) {
    this.router.navigateByUrl(`/home/empresas/nuevo-prospecto`)
  }

  seeData(data:any) {
    this.router.navigateByUrl(`home/adquisicion/detalle-empresa/1`)
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
      .subscribe((_) => {
        this.notificationService
          .notificacion(
            'Éxito',
            'Registro eliminado.',
            'delete',
          )
          .afterClosed()
          .subscribe((_) => {

          });
      });
  }

}
