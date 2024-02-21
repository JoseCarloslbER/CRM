import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalNewActivityComponent } from 'app/pages/companies/all/detail-client/components/history/modal-new-activity/modal-new-activity.component';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ReactivationService } from '../reactivation.service';
import * as entity from '../reactivation-interface';

@Component({
  selector: 'app-pending-calls',
  templateUrl: './pending-calls.component.html',
})
export class PendingCallsComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'name',
    'camping',
    'dueDate',
    'expirationTime',
    'user',
    'comments',
    'acciones',
  ];

  public dataDummy: any[] = [
    {

      client : 'RECK SOLUCIONES',
      advertising : 'campaña de prueba2',
      dueDate: '2022-02-28',
      expirationTime: '2022-02-28',
      user : 'AgenteATCAle',
      assigned : 'AgenteATCAle',
      comments : 'Test nueva funcionalidad calendario.'
    },
    {

      client : 'RECK SOLUCIONES',
      advertising : 'campaña de prueba2',
      dueDate: '2022-02-28',
      expirationTime: '2022-02-28',
      user : 'AgenteATCAle',
      assigned : 'AgenteATCAle',
      comments : 'Test nueva funcionalidad calendario.'
    },
    {

      client : 'RECK SOLUCIONES',
      advertising : 'campaña de prueba2',
      dueDate: '2022-02-28',
      expirationTime: '2022-02-28',
      user : 'AgenteATCAle',
      assigned : 'AgenteATCAle',
      comments : 'Test nueva funcionalidad calendario.'
    },
    {

      client : 'RECK SOLUCIONES',
      advertising : 'campaña de prueba2',
      dueDate: '2022-02-28',
      expirationTime: '2022-02-28',
      user : 'AgenteATCAle',
      assigned : 'AgenteATCAle',
      comments : 'Test nueva funcionalidad calendario.'
    },
   
  ]

  public formFilters = this.formBuilder.group({
    estatus: [{ value: null, disabled: false }],
    giro: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  public fechaHoy = new Date();

  public searchBar = new FormControl('')

  constructor(
    private moduleServices: ReactivationService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDataTable()
  }

  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content:string) => {
      console.log(content);
    })
  }


  getDataTable(filters?: any) {
    this.moduleServices.getDataTable(filters).subscribe({
      next: (data: entity.TableDataCallsMapper[]) => {
        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => console.error(error)
    })
  }

  newOrEditData(data = null) {
    this.dialog.open(ModalNewActivityComponent, {
      data: {
        info: data,
        type: 'calls'
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })  
    .afterClosed()
    .subscribe((_) => this.getDataTable());
  }

  seeCampaignsResults(data:any) {
    console.log(data);

    this.moduleServices.sendData(data);
    this.router.navigateByUrl('/home/reactivacion/resultados-campanias/calls');
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
        this.moduleServices.deleteData(id).subscribe({
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
