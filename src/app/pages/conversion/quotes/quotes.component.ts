import { Component, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalUploadDocumentComponent } from '../modal-upload-document/modal-upload-document.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: []
})
export class QuotesComponent {
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
    },
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
    },
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
    },
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
    },
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
    },
  

  ]

  public fechaHoy = new Date();


  public formFilters = this.formBuilder.group({
    estatus: [{ value: null, disabled: false }],
    agent: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  constructor(
    private notificationService: OpenModalsService,
    private openModalsService: OpenModalsService,
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
    this.dialog.open(ModalUploadDocumentComponent, {
      data: {},
      disableClose: true,
      width: '800px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    });
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
}
