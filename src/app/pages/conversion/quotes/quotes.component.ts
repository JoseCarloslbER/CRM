import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalUploadDocumentComponent } from '../modal-upload-document/modal-upload-document.component';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ConversionService } from '../conversion.service';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import moment from 'moment';
import { ModalCloseSaleComponent } from '../modal-close-sale/modal-close-sale.component';
import { CatalogsService } from 'app/shared/services/catalogs.service';
import { ModalBillingComponent } from '../modal-billing/modal-billing.component';
import { TableDataQuoteMapperResponse } from '../conversion-interface';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styles: [`
      .c-quote {
        ::ng-deep .mat-mdc-tab-body-content {
          padding: 0!important;
          overflow: hidden!important;
        }
      }
  `]
})
export class QuotesComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'dateAndHour',
    'information',
    'companyName',
    'status',
    'totalPrice',
    'products',
    'stateCountry',
    'actions',
    'operations'
  ];

  public formFilters = this.formBuilder.group({
    status: [{ value: null, disabled: false }],
    agent: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  public searchBar = new FormControl('')

  public actions = new FormControl('')

  public catStatus: entityGeneral.DataCatStatus[] = [];
  public catAgents: entityGeneral.DataCatAgents[] = [];

  public fechaHoy = new Date();

  public totalQuotes : number = 0;
  public selectedOption: number | null = null;

  constructor(
    private moduleServices: ConversionService,
    private catalogsServices: CatalogsService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchWithFilters();
    this.getCatalogs()
  }

  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      console.log(content);
    })
  }

  getActions(type:string, data:any) {
    console.log(data);
    
    if (type == 'Aceptar') {
      this.acceptQuote({
        company_id : data.companyName.id,
        quote_id : data.id,
        status_id : '3944df8e-d359-4569-b712-ea174be69cca'
      }) 
    } else if(type == 'Cerrar como venta') {
      this.closeSale(data)
    }
  }

  getCatalogs() {
    this.catalogsServices.getCatStatus().subscribe({
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
  }

  searchWithFilters() {
    let filters = '';

    if (this.formFilters.get('status').value) filters += `status_id=${this.formFilters.get('status').value}&`;
    if (this.formFilters.get('agent').value) filters += `user_id=${this.formFilters.get('agent').value}&`;
    if (this.formFilters.get('rangeDateStart').value && this.formFilters.get('rangeDateEnd').value) {
      filters += `register_date_start=${moment(this.formFilters.get('rangeDateStart').value).format('YYYY-MM-DD')}&`,
        filters += `register_date_end=${moment(this.formFilters.get('rangeDateEnd').value).format('YYYY-MM-DD')}&`
    }

    this.getDataTable(filters)
  }

  getDataTable(filters:string) {
    this.moduleServices.getDataTable(filters).subscribe({
      next: ( data : TableDataQuoteMapperResponse) => {
        this.dataSource.data = data.dataList;
        this.totalQuotes = data.totalQuotes;
      },
      error: (error) => console.error(error)
    })
  }

  seeData(id:string) {
    this.router.navigateByUrl(`/home/conversion/detalle-cotizacion/${id}`)
  }

  editData(id:string) {
    this.router.navigateByUrl(`/home/conversion/editar-cotizacion/${id}`)
  }

  newData() {
    this.router.navigateByUrl(`/home/conversion/nueva-cotizacion`)
  }



  selectOption(option: number) {
    this.selectedOption = option;
  }

  acceptQuote(data : any) {
    this.notificationService
    .notificacion(
      'Pregunta',
      '¿Estás seguro de aceptar la cotización?',
      'question',
    )
    .afterClosed()
    .subscribe((response) => {
      if (response) {
        this.moduleServices.acceptQuote({quote : data}).subscribe({
          next: () => {
              this.notificationService
              .notificacion(
                'Éxito',
                'Cotización aceptada.',
                'save',
              )
              .afterClosed()
              .subscribe((_) => this.searchWithFilters());
          },
          error: (error) => console.error(error)
        })
      }
    });
  }

  moneyAccount(data:any) {
    let objData:any = {
      payment_date: new Date(),
      status_id : 'f4fa3c48-8b48-4d39-ad09-a6699a66459f',
      quote_id : data.id,
      company_id : data.companyName.id,
    }
    console.log('moneyAccount', objData);
    
    this.notificationService
    .notificacion(
      'Pregunta',
      '¿Estás seguro que el dinero ya está en la cuenta bancaria?',
      'question',
    )
    .afterClosed()
    .subscribe((response) => {
      if (response) {
        this.moduleServices.moneyAccount({quote: objData}).subscribe({
          next: () => {
              this.notificationService
              .notificacion(
                'Éxito',
                'Dinero en cuenta, pago confirmado.',
                'save',
              )
              .afterClosed()
              .subscribe((_) => this.searchWithFilters());
          },
          error: (error) => console.error(error)
        })
      }
    });
  }

  closeSale(data: any) {
    this.dialog.open(ModalCloseSaleComponent, {
      data: {
        info: data,
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
    .afterClosed()
    .subscribe((_) => this.searchWithFilters());
  }

  billing(data: any) {
    this.dialog.open(ModalBillingComponent, {
      data: {
        info: data,
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
    .afterClosed()
    .subscribe((_) => this.searchWithFilters());
  }

  addUpladFile() {
    this.dialog.open(ModalUploadDocumentComponent, {
      data: {},
      disableClose: true,
      width: '800px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
  .afterClosed()
  .subscribe((_) => this.searchWithFilters());
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

  downloadPdf() {
    this.notificationService
    .notificacion(
      'Éxito',
      'PDF descargado.',
      'save',
      'mat_outline:picture_as_pdf'
    )
    .afterClosed()
    .subscribe((_) => {
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
