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
  selector: 'app-bonuses',
  templateUrl: './bonuses.component.html',
  styleUrl: './bonuses.component.scss'
})
export class BonusesComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'name',
    'assignedTask',
    'periodThe',
    'solutions',
    'bonoType',
    'agent',
    'base',
    'meta',
    'comments',

    'acciones'
  ];
 
  
  public dataDummy: any[] = [
    {
      name : 'Apr 2020',
      assignedTask : 'Campaña X',
      agent : 'Ver agentes',
      bonoType : '$000',
      base : 'Fija',
      meta : 'Contactos logrados',
      comments : 'Lorem ipsum',
      periodThe : [
        {
          del : '03/01/2023',
          al :  ' 03/01/2023'
        }
      ],
      solutions : [
        {
          sol1 : 'Solución X',
          sol2 :  ' Solución Y'
        }
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

  ngAfterViewInit(): void {
    
  }

  newData() {
    this.router.navigateByUrl(`/home/admin/nuevo-bono`)
  }
  
  editData() {
    this.router.navigateByUrl(`/home/admin/editar-bono/1`)
  }
  
  cloneData() {
    this.router.navigateByUrl(`/home/admin/clonar-bono/1`)
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
