import { Component, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalNewQuoteComponent } from '../modal-new-quote/modal-new-quote.component';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent {
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  // TABLA 

  public displayedColumns: string[] = [
    'empresa',
    'fechaYHora',
    'folio',
    'documentos',
    'estatus',
    'precioTotal',
    'lugares',
    'nivelInteres',
    'estadopais',
    'acciones',
    'operaciones'
  ];


  public dataDummy: any[] = [
    {
      empresa: 'RECK SOLUCIONES',
      fechaYHora: '2023-09-30 12:38:49',
      folio: '#123345',
      precioTotal: '$4,000,000.00',
      nivelInteres: 'Alto',
      estatus: 'LEAD',
      estadopais: 'Mexico, Nuevo Leon',
      documentos: [
        {
          cotizacion: 'Cotización',
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
      folio: '#123345',
      precioTotal: '$4,000,000.00',
      nivelInteres: 'Alto',
      estatus: 'LEAD',
      estadopais: 'Mexico, Nuevo Leon',
      documentos: [
        {
          cotizacion: 'Cotización',
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



  newQuotes() {
    this.dialog.open(ModalNewQuoteComponent, {
      data: ['test'],
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    });
  }

}
