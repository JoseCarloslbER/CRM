import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalInformationInTableComponent } from 'app/pages/catchment/campaigns/modal-information-in-table/modal-information-in-table.component';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CatchmentService } from '../catchment.service';
import { DataTableFilters } from '../catchment-interface';
import * as entity from '../catchment-interface';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
})
export class CampaignsComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumnsCampaign: string[] = [
    'codeAndname',
    'dateStartEnd',
    'companyType',
    'agents',
    'companies',
    'results',
    'amounInvested',
    'totalCompanies',
    'quotesMade',
    'totalSalesAmount',
    'acciones',
  ];
  
  public formFilters = this.formBuilder.group({
    status: [{ value: null, disabled: false }],
    giro: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }]
  });

  public catalogTypes : entity.DataCatType[] = []; 

  public fechaHoy = new Date();

  public searchBar = new FormControl('');

  constructor(
    private moduleServices: CatchmentService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDataTable();
    // this.getCatalogs()
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

    console.log(objFilters);
    this.getDataTable(objFilters)
  }

  getCatalogs() {
    this.moduleServices.getCatalogType().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data : entity.DataCatType[]) => {
        console.log(data);
        
        this.catalogTypes = data
        console.log(this.catalogTypes);
      },
      error: (error) => console.error(error)
    })
   }

  getDataTable(filters?:DataTableFilters) {
    this.moduleServices.getDataTableCampaing(filters).pipe(takeUntil(this.onDestroy)).subscribe({
        next: ( data : entity.TableDataCampaingListMapper[]) => {
          console.log('DATOS DE LA TABLA', data[0]);
          this.dataSource.data = data;
        },
        error: (error) => console.error(error)
      })
  }

  seeData(id: any) {
    this.router.navigateByUrl(`/home/captacion/detalle-campaña/1`)
  }

  newData() {
    this.router.navigateByUrl(`home/captacion/nueva-campaña`)
  }

  editData(id: any) {
    this.router.navigateByUrl(`home/captacion/editar-campaña/1`)
  }
  
  cloneData(id: any) {
    this.router.navigateByUrl(`home/captacion/clonar-campaña/1`)
  }

  deleteData(id:string) {
    // this.notificationService
    // .notificacion(
    //   'Pregunta',
    //   '¿Estas seguro de eliminar el registro?',
    //   'question',
    // )
    // .afterClosed()
    // .subscribe((resp) => {
    //   if (resp) {
    //     this.moduleServices.deleteData(id).pipe(takeUntil(this.onDestroy)).subscribe({
    //       next: (response) => {
    //         if (response) {
    //           this.notificationService
    //           .notificacion(
    //             'Éxito',
    //             'Registro eliminado.',
    //             'delete',
    //           )
    //           .afterClosed()
    //           .subscribe((_) => {
    
    //           });
              
    //         }
    //       },
    //       error: (error) => console.error(error)
    //     })
    //   }
    // });

    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estas seguro de eliminar el registro?',
        'question',
      )
      .afterClosed()
      .subscribe(( response) => {
        if (response) {
          this.notificationService
          .notificacion(
            'Éxito',
            'Registro eliminado.',
            'delete',
          )
          .afterClosed()
          .subscribe((_) => {

          });
        }
      });
  }

  seeDataModal(type:string, data: entity.User | entity.Company) {
    this.dialog.open(ModalInformationInTableComponent, {
      data: {
        type: type,
        info : data
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '700px',
      panelClass: 'custom-dialog',
    });
  }

  seeCampaignsResults() {
    this.router.navigateByUrl(`home/captacion/resultados-campanias/1`)
  }

  douwnloadExel(){
    //   this.moduleServices.excel(id).pipe(takeUntil(this.onDestroy)).subscribe({
    //   next: (_) => {
    //     this.notificationService
    //       .notificacion(
    //         'Éxito',
    //         'Excel descargado.',
    //         'save',
    //         'mat_solid:downloading'
    //       )
    //       .afterClosed()
    //       .subscribe((_) => { });
    //   },
    //   error: (error) => console.error(error)
    // })

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


