import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import * as entity from '../../../config-interface';
import { ConfigService } from 'app/pages/config/config.service';
import { SharedModalComponent } from '../shared-modal/shared-modal.component';


@Component({
  selector: 'app-giro-company',
  templateUrl: './giro-company.component.html',
})
export class GiroCompanyComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'business_name',
    'acciones'
  ];

  constructor(
    private moduleServices: ConfigService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.getDataTable();
  }

  getDataTable() {
    this.moduleServices.getTableDataBusiness().subscribe({
      next: (data: entity.TableDataBusiness[]) => {
        this.dataSource.data = data;
      },
      error: (error) => console.error(error)
    })
  }

  editData(data: any) {
    this.dialog.open(SharedModalComponent, {
      data: {
        info: data,
        type: 'business'
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '428px',
      panelClass: 'custom-dialog',
    })
    .afterClosed()
    .subscribe(() => this.getDataTable());
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
        this.moduleServices.deleteDataBusiness(id).subscribe({
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

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
