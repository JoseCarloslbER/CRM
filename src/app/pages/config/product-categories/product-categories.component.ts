import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalNewProductCategoryComponent } from './modal-new-product-category/modal-new-product-category.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
})
export class ProductCategoriesComponent implements OnInit, AfterViewInit, OnDestroy {
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
      name: 'Depósito en Efectivo',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      name: 'Depósito en Efectivo',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      name: 'Depósito en Efectivo',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      name: 'Depósito en Efectivo',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      name: 'Depósito en Efectivo',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ]

  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
  }

  ngAfterViewInit(): void {
    
  }
  
  newOrEditData(data = null) {
    this.dialog.open(ModalNewProductCategoryComponent, {
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
