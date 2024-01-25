import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ModalNewProductComponent } from './modal-new-product/modal-new-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'code',
    'name',
    'price',
    'country',
    'link',
    'actions'
  ];

  public dataDummy: any[] = [
    {
      code: 'CD4557',
      name: 'Seguridad y prevención contra incendio en los centros de trabajo',
      price: '$ 1000.00',
      country: 'México',
      link: 'https://abrevius.com/course/c001-seguridad-en-edificios-locales-instalaciones-y-areas-de-trabajo/',
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
    this.dialog.open(ModalNewProductComponent, {
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
