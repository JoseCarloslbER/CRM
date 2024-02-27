import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'user',
    'rol',
    'ip',
    'exention',
    'acciones'
  ];
 
  
  public dataDummy: any[] = [
    {
      user: 'Agente 1',
      rol: 'Atención a cliente',
      exention: '3002',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      user: 'Agente 1',
      rol: 'Atención a cliente',
      exention: '3002',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      user: 'Agente 1',
      rol: 'Atención a cliente',
      exention: '3002',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      user: 'Agente 1',
      rol: 'Atención a cliente',
      exention: '3002',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      user: 'Agente 1',
      rol: 'Atención a cliente',
      exention: '3002',
      comments: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      ip: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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

  newData() {
    this.router.navigateByUrl(`/home/admin/nuevo-usuario`)
  }

  editData() {
    this.router.navigateByUrl(`/home/admin/editar-usuario/1`)
  }

  deleteData() {
    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estás seguro de eliminar el registro?',
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
