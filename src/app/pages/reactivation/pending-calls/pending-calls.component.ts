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
import { DataTable } from '../reactivation-interface';

@Component({
  selector: 'app-pending-calls',
  templateUrl: './pending-calls.component.html',
  styleUrl: './pending-calls.component.scss'
})
export class PendingCallsComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  // TABLA 

  public displayedColumns: string[] = [
    'client',
    'advertising',
    'dueDate',
    'dueDate',
    'expirationTime',
    'user',
    'assigned',
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

  public fechaHoy = new Date();

  public searchBar = new FormControl('')


  public formFilters = this.formBuilder.group({
    estatus: [{ value: null, disabled: false }],
    giro: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });


  constructor(
    // private moduleServices: ReactivationService,
    private openModalsService: OpenModalsService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      
      this.dataSource.data = this.dataDummy
    }, 500);
  }

  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content:string) => {
      console.log(content);
    })
  }

  searchWithFilters() {
    let objFilters:any = {
      ...this.formFilters.value
    }

    this.getDataTable(objFilters)
  }

  getCatalogs() {
    
  }

  getDataTable(filters:Object) {
    // this.moduleServices.getDataTable(filters).subscribe({
    //     next: ({ data } : DataTable) => {
    //       console.log(data);
    //     },
    //     error: (error) => console.error(error)
    //   }
    // )
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

  seeAdvertising(data:any) {
  }

  editData() {
    this.dialog.open(ModalNewActivityComponent, {
      data: { },
      disableClose: true,
      width: '1000px',
      maxHeight: '700px',
      panelClass: 'custom-dialog',
    });
  }
  newData() {
    this.dialog.open(ModalNewActivityComponent, {
      data: { },
      disableClose: true,
      width: '1000px',
      maxHeight: '700px',
      panelClass: 'custom-dialog',
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

}
