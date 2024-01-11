import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ModalNewPriceComponent } from './modal-new-price/modal-new-price.component';


@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrl: './price.component.scss'
})
export class PriceComponent {
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'code',
    'unitPrice',
    'iva',
    'currency',
    'productsApplies',
    'actions'
  ];

  public dataDummy: any[] = [
    {
      code: 'Atención a cliente',
      unitPrice: '$ 1000.00',
      iva: '25.75%',
      currency: '25.75%',
      productsApplies: [
        {
          name : 'Categoría X'
        },
        {
          name : 'Categoría X'
        },
        {
          name : 'Categoría X'
        },
      ]
    },
 
  ]

  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
  }

  editData() {
    this.dialog.open(ModalNewPriceComponent, {
      data: {},
      disableClose: true,
      width: '800px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    });
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
