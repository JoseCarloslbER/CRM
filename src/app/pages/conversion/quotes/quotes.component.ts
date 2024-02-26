import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalUploadDocumentComponent } from '../modal-upload-document/modal-upload-document.component';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import * as entity from '../conversion-interface';
import { ConversionService } from '../conversion.service';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import moment from 'moment';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styles: [`
      .c-quote {
        ::ng-deep .mat-mdc-tab-body-content {
        padding: 0!important;
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

  public catStatus: entityGeneral.DataCatStatus[] = [];
  public catAgents: entityGeneral.DataCatAgents[] = [];

  public fechaHoy = new Date();

  constructor(
    private moduleServices: ConversionService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.dataSource.data = this.dataDummy
    this.searchWithFilters();
    this.getCatalogs()
  }

  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      console.log(content);
    })
  }

  getCatalogs() {
    this.moduleServices.getCatStatus().subscribe({
      next: (data: entityGeneral.DataCatStatus[]) => {
        this.catStatus = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatAgents().subscribe({
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
    this.moduleServices.getDataTable(filters).pipe(takeUntil(this.onDestroy)).subscribe({
      next: ( data : any) => {
        console.log('*************************************');
        console.log('TABLA:', data[0]);
        this.dataSource.data = data
      },
      error: (error) => console.error(error)
    })
  }


  seeQuote(data:any) {
    this.router.navigateByUrl(`/home/conversion/detalle-cotizacion/${1}`)
  }

  editData(data:any) {
    this.router.navigateByUrl(`/home/conversion/editar-cotizacion/1`)
  }

  newData() {
    this.router.navigateByUrl(`/home/conversion/nueva-cotizacion`)
  }

  seeTicket() {
    this.dialog.open(ModalUploadDocumentComponent, {
      data: {},
      disableClose: true,
      width: '800px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
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
