import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalNewActivityComponent } from 'app/pages/companies/all/detail-client/components/history/modal-new-activity/modal-new-activity.component';
import { Subject, Subscription, debounceTime, takeUntil } from 'rxjs';
import { ManagementmentService } from '../management.service';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import moment from 'moment';
import * as entity from '../management-interface';
import { TableDataActivityType } from 'app/pages/config/config-interface';
import { UpdateComponentsService } from 'app/shared/services/updateComponents.service';
import { ModalFinallyComponent } from './modal-finally/modal-finally.component';
import { CatalogsService } from 'app/shared/services/catalogs.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
})
export class ActivitiesComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();
  private updateSubscription: Subscription;

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'name', 
    'process', 
    'agent', 
    'activityType', 
    'register', 
    'endDate', 
    'description', 
    'actions', 
  ];

  public formFilters = this.formBuilder.group({
    status: [{ value: '', disabled: false }],
    agent: [{ value: '', disabled: false }],
    type: [{ value: '', disabled: false }],
    rangeDateStart: [{ value: '', disabled: false }],
    rangeDateEnd: [{ value: '', disabled: false }]
  });

  public searchBar = new FormControl('');
  
  public fechaHoy = new Date();

  public catActivitiesTypes: TableDataActivityType [] = [];
  public catStatus: entityGeneral.DataCatStatus[] = [];
  public catAgents: entityGeneral.DataCatAgents[] = [];

  constructor(
    private moduleServices: ManagementmentService,
    private updateService: UpdateComponentsService,
    private catalogsServices: CatalogsService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.updateSubscription = this.updateService.updateEvent$.subscribe(() => {
      this.getDataTable();
    });
    this.getDataTable();
    this.getCatalogs()
  }

  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      this.applyFilter(content); 
    })
  }

  getCatalogs() {
    this.catalogsServices.getCatStatus('module_id=1').subscribe({
      next: (data: entityGeneral.DataCatStatus[]) => {
        this.catStatus = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatAgents().subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catAgents = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatActivityType().subscribe({
      next: (data: TableDataActivityType[]) => {
        this.catActivitiesTypes = data;
      },
      error: (error) => console.error(error)
    })
  }

  searchWithFilters() {
    let filters = '';

    if (this.formFilters.get('status').value) filters += `status_id=${this.formFilters.get('status').value}&`;
    if (this.formFilters.get('agent').value) filters += `user_id=${this.formFilters.get('agent').value}&`;
    if (this.formFilters.get('type').value) filters += `activity_type_id=${this.formFilters.get('type').value}&`;
    if (this.formFilters.get('rangeDateStart').value && this.formFilters.get('rangeDateEnd').value) {
      filters += `start_date=${moment(this.formFilters.get('rangeDateStart').value).format('YYYY-MM-DD')}&`;
      filters += `end_date=${moment(this.formFilters.get('rangeDateEnd').value).format('YYYY-MM-DD')}&`;
    }

    this.getDataTable(filters)
  }

  getDataTable(filters?: any) {
    this.moduleServices.getDataTableActivities(filters).subscribe({
      next: (data: entity.TableDataActivitiesMapper[]) => {
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
        type: 'activities'
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })  
    .afterClosed()
    .subscribe((_) => this.searchWithFilters());
  }

  finally(data = null) {
    this.dialog.open(ModalFinallyComponent, {
      data: {
        info: data,
        type: 'activities'
      },
      disableClose: true,
      width: '350px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    });
  }

  deleteData(id: string) {
    this.notificationService
    .notificacion(
      'Pregunta',
      '¿Estás seguro de eliminar el registro?',
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
              .subscribe((_) => this.searchWithFilters());
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
