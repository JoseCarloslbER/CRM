import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OpenModalsService } from 'app/shared/services/openModals.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrl: './discounts.component.scss'
})
export class DiscountsComponent {
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'name',
    'scale',
    'productsApply',
    'categoriesApply',
    'countriesApply',
    'currencyApply',
    'actions'
  ];

  public dataDummy: any[] = [
    {
      name: 'CD4557',
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
      ],
      scale: [
        {
          name : 'Escala 1'
        },
        {
          name : 'Escala 2'
        },
        {
          name : 'Escala 3'
        },
      ],
      productsApply: [
        {
          name : 'Producto 1'
        },
        {
          name : 'Producto 2'
        },
        {
          name : 'Producto 3'
        },
      ],
      categoriesApply: [
        {
          name : 'Categoría 1'
        },
        {
          name : 'Categoría 2'
        },
        {
          name : 'Categoría 3'
        },
      ],
      countriesApply: [
        {
          name : 'País 1'
        },
        {
          name : 'País 2'
        },
        {
          name : 'País 3'
        },
      ],
      currencyApply: [
        {
          name : 'Moneda 1'
        },
        {
          name : 'Moneda 2'
        },
        {
          name : 'Moneda 3'
        },
      ],
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
    this.router.navigateByUrl(`/home/admin/nuevo-descuento`)
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
