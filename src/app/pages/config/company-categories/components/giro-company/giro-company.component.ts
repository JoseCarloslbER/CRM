import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalNewCompanyTypeComponent } from '../../modal-new-company-type/modal-new-company-type.component';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-giro-company',
  templateUrl: './giro-company.component.html',
})
export class GiroCompanyComponent  implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'name',
    'comments',
    'acciones'
  ];


  public dataDummy: any[] = [
    {
      name: 'Campaña',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      name: 'Campaña',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      name: 'Campaña',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      name: 'Campaña',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      name: 'Campaña',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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

  ngAfterViewInit(): void {
    
  }

  editData(data:any) {
    this.dialog.open(ModalNewCompanyTypeComponent, {
      data: {
        info : data
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '428px',
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

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
