import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CompaniesService } from 'app/pages/companies/companies.service';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrl: './pipeline.component.scss'
})
export class PipelineComponent {
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  // TABLA 

  public displayedColumns: string[] = [
    'fechaYHora',
    'informacion',
    'empresa',
    'statusCompany',
    'totalPrice',
    'products',
    'estadopais',
    'acciones',
    'operaciones'
  ];


  public dataDummy: any[] = [
    {
      empresa: 'RECK SOLUCIONES',
      fechaYHora: '2023-09-30 12:38:49',
      statusCompany: 'Cliente',
      precioTotal: '$4,000,000.00',
      estatus: 'LEAD',
      estadopais: 'Mexico, Nuevo Leon',
      totalPrice: [
        {
          op: ' $12354.00',
          expires: '2023-09-30',
        },
        {
          op: ' $12354.00',
          expires: '2023-09-30',
        }
      ],
      documentos: [
        {
          cotizacion: 'Cotización',
          cotizacionAprobada: 'Cotización aprobada',
        }
      ],
      informacion: [
        {
          numero: '#4234234',
          status: 'Aprobada',
          cotizacionAprobada: 'Cotización aprobada',
        }
      ],
      lugares: [
        {
          no: '1548',
          tipo: 'Lista',
          lugares: '5',
          curso: 'C029 - Seguridad en el mantenimiento de instalaciones eléctrica',
          precio: '$1,995.00',
        }
      ],
    }
  ]

  public fechaHoy = new Date();


  public formFilters = this.formBuilder.group({
    client: [{ value: null, disabled: false }],
    agent: [{ value: null, disabled: false }],
    status: [{ value: null, disabled: false }],
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
    this.dataSource.data = this.dataDummy
  }

  searchWithFilters() {
    console.log(this.formFilters.value);
  }

  seeQuote(data:any) {
    this.router.navigateByUrl(`/home/conversion/detalle-cotizacion/${1}`)
  }

  editData(data:any) {
    this.router.navigateByUrl(`/home/conversion/nueva-cotizacion`)
  }

  newData() {
    this.router.navigateByUrl(`/home/conversion/nueva-cotizacion`)
  }

  seeTicket() {
  
  }

  newDataQuote() {
    this.router.navigateByUrl(`/home/conversion/nueva-cotizacion`)
  }


  
  onTabChange(event: MatTabChangeEvent): void {
    console.log(event.tab.textLabel);
  }

  downloadPdf() {
    this.notificationService
    .notificacion(
      'Éxito',
      'PDF descargado.',
      'save',
      'mat_outline:picture_as_pdf'
    )
    .afterClosed()
    .subscribe((_) => {

    });
  }
}
