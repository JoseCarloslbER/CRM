import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalNewWayToPayComponent } from './modal-new-way-to-pay/modal-new-way-to-pay.component';
import { Subject } from 'rxjs';
import { ConfigService } from '../config.service';
import * as entity from '../config-interface';

@Component({
  selector: 'app-way-to-pay',
  templateUrl: './way-to-pay.component.html',
})
export class WayToPayComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'name',
    'acciones'
  ];

  public dataDummy: any[] = [
    {
      name: 'Depósito en Efectivo',
    },
  ]

  constructor(
    private moduleServices: ConfigService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
    this.getDataTable();
  }

  getDataTable() {
    this.moduleServices.getTableDataWayToPay().subscribe({
      next: (data: entity.TableDataWayToPay[]) => {
        // this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => console.error(error)
    })
  }

  newOrEditData(data = null) {
    this.dialog.open(ModalNewWayToPayComponent, {
      data: {
        info : data
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '428px',
      panelClass: 'custom-dialog',
    });
  }

  deleteData(id: string) {
    this.notificationService
    .notificacion(
      'Pregunta',
      '¿Estas seguro de eliminar el registro?',
      'question',
    )
    .afterClosed()
    .subscribe((response) => {
      if (response) {
        this.moduleServices.deleteDataWayToPay(id).subscribe({
          next: () => {
              this.notificationService
              .notificacion(
                'Éxito',
                'Registro eliminado.',
                'delete',
              )
              .afterClosed()
              .subscribe((_) => this.getDataTable());
          },
          error: (error) => console.error(error)
        })
      }
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

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
