import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses.component.html',
  styleUrl: './bonuses.component.scss'
})
export class BonusesComponent implements OnInit, OnDestroy {
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
    }
  ]

  public fechaHoy = new Date();

  public isBono :boolean = true;
  
  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
  }

  newData() {
    this.router.navigateByUrl(`/home/admin/nuevo-bono`)
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
