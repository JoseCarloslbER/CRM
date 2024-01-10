import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalnewActivityComponent } from '../modalnew-activity/modalnew-activity.component';

@Component({
  selector: 'app-subactivity',
  templateUrl: './subactivity.component.html',
})
export class SubactivityComponent {
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'subactivity',
    'color',
    'icon',
    'acciones'
  ];


  public dataDummy: any[] = [
    {
      subactivity: 'Administración',
      color: '#9747FF',
      icon: 'headphones',
    },
    {
      subactivity: 'Administración',
      color: '#9747FF',
      icon: 'headphones',
    },
    {
      subactivity: 'Administración',
      color: '#9747FF',
      icon: 'headphones',
    },
    {
      subactivity: 'Administración',
      color: '#9747FF',
      icon: 'headphones',
    },
    {
      subactivity: 'Administración',
      color: '#9747FF',
      icon: 'headphones',
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
    this.dialog.open(ModalnewActivityComponent, {
      data: ['test'],
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

}