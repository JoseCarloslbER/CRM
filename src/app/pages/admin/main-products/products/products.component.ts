import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ModalNewProductComponent } from './modal-new-product/modal-new-product.component';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../admin.service';
import * as entity from '../../admin-interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

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
    private moduleServices: AdminService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
    this.getDataTable()
  }

  getDataTable() {
    this.moduleServices.getDataTableProducts().pipe(takeUntil(this.onDestroy)).subscribe({
        next: ({ data } : entity.DataProductTable) => {
          console.log(data);
          this.dataSource.data = data;
        },
        error: (error) => console.error(error)
      })
  }

  editData(id: string) {
    this.dialog.open(ModalNewProductComponent, {
      data: {
        idEdit: id
      },
      disableClose: true,
      width: '800px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    });
  }

  actionQuestionDelete(id: string) {
    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estas seguro de eliminar el registro?',
        'question',
      )
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.deleteData(id)
        }
      });
  };

  deleteData(id: string) {
    this.moduleServices.deleteDataProduct(id).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (_) => {
        this.notificationService
          .notificacion(
            'Éxito',
            'Registro eliminado.',
            'delete',
          );
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

}
