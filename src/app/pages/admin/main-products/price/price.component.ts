import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ModalNewPriceComponent } from './modal-new-price/modal-new-price.component';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../admin.service';
import * as entity from '../../admin-interface';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrl: './price.component.scss'
})
export class PriceComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

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
    private moduleServices: AdminService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.dataSource.data = this.dataDummy;
    this.getDataTable();
  }

  getDataTable() {
    this.moduleServices.getDataTablePrices().pipe(takeUntil(this.onDestroy)).subscribe({
        next: ({ data } : entity.DataPriceTable) => {
          console.log(data);
          this.dataSource.data = data;
        },
        error: (error) => console.error(error)
      })
  }

  editData(id: string) {
    this.dialog.open(ModalNewPriceComponent, {
      data: {
        idEdit: id
      },
      disableClose: true,
      width: '800px',
      maxHeight: '628px',
      panelClass: 'custom-dialog'
    });
  }


  actionQuestionDelete(id: string) {
    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estas seguro de eliminar el registro?',
        'question'
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
