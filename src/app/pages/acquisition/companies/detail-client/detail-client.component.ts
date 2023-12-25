import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalNewActivityComponent } from '../modal-new-activity/modal-new-activity.component';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.scss'
})
export class DetailClientComponent {
  public dataSourceQuotes = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'empresa',
    'fecha',
    'folio',
    'precioTotal',
    'nivelInteres',
    'estadopais',
    'estatus',
    'agente',
    'lugares',
    'actividades',
    'agregarOpciones',
    'modificarEstatus',
    'acciones',
  ];

  public dataDummy: any[] = [
    {
      empresa: 'RECK SOLUCIONES',
      fecha: '2023-09-30 12:38:49',
      folio: '#123345',
      precioTotal: '$4,000,000.00',
      nivelInteres: 'Alto',
      estatus: 'LEAD',
      agente: 'Atendió: Marketing',
      estadopais: 'Mexico, Nuevo Leon',
      actividades: 'Ver historial',
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

  constructor(
    private openModalsService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSourceQuotes.data = this.dataDummy
  }

  newActivity() {
    this.dialog.open(ModalNewActivityComponent, {
      data: ['test'],
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    });
  }


}
