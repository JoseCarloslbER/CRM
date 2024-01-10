import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent implements OnInit{
  public dataSourceQuotes = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

 
  public displayedColumns: string[] = [
    'folio',
    'fechaYHora',
    'documentos',
    'precioTotal',
    'lugares',
    'estadopais',
    'acciones',
    'operaciones',
  ];
 

  public dataDummy: any[] = [
    {
      fechaYHora: '2023-09-30 12:38:49',
      folio: '#123345',
      precioTotal: '$4,000,000.00',
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


  ngOnInit(): void {
    this.dataSourceQuotes.data = this.dataDummy

  }


}