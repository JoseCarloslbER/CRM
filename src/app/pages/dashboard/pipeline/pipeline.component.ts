import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DashboardService } from '../dashboard.service';
import { Subject } from 'rxjs';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ConversionService } from 'app/pages/conversion/conversion.service';
import { ModalBillingComponent } from 'app/pages/conversion/modal-billing/modal-billing.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalUploadDocumentComponent } from 'app/pages/conversion/modal-upload-document/modal-upload-document.component';
import moment from 'moment';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import { CatalogsService } from 'app/shared/services/catalogs.service';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrl: './pipeline.component.scss'
})
export class PipelineComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public formFilters = this.formBuilder.group({
    client: [{ value: '', disabled: false }],
    agent: [{ value: '', disabled: false }],
    status: [{ value: '', disabled: false }],
    rangeDateStart: [{ value: '', disabled: false }],
    rangeDateEnd: [{ value: '', disabled: false }],
  });

  public fechaHoy = new Date();

  public catStatus: entityGeneral.DataCatStatus[] = [];
  public catAgents: entityGeneral.DataCatAgents[] = [];
  public catCompanies: entityGeneral.DataCatCompany[] = [];

  public filterDayMonthYear: string = 'Día'

  public dataPipele : any;

  constructor(
    private moduleServices: DashboardService,
    private catalogsServices: CatalogsService,
    private moduleServicesQuote: ConversionService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchWithFilters();
    this.getCatalogs();
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
 
    this.catalogsServices.getCatCompany().subscribe({
      next: (data: entityGeneral.DataCatCompany[]) => {
        this.catCompanies = data;
      },
      error: (error) => console.error(error)
    });
  }

  searchWithFilters() {
    let filters: string = '';

    if (this.filterDayMonthYear == 'Día') filters += `current_day=true&`
     else if (this.filterDayMonthYear == 'Mes') filters += `current_month=true&`
     else filters += `current_year=true&`
    if (this.formFilters.get('client').value) filters += `company_id=${this.formFilters.get('client').value}&`;
    if (this.formFilters.get('agent').value) filters += `user_id=${this.formFilters.get('agent').value}&`;
    if (this.formFilters.get('status').value) filters += `status_id=${this.formFilters.get('status').value}&`;
    if (this.formFilters.get('rangeDateStart').value && this.formFilters.get('rangeDateEnd').value) {
      filters += `register_date_start=${moment(this.formFilters.get('rangeDateStart').value).format('YYYY-MM-DD')}&`,
        filters += `register_date_end=${moment(this.formFilters.get('rangeDateEnd').value).format('YYYY-MM-DD')}&`
    }

    this.getPipeline(filters)
  }

  getPipeline(filters?:string) {
    this.moduleServices.getPipeline(filters).subscribe({
      next: (data : any) => {
        this.dataPipele = data;
      },
      error: (error) => console.error(error)
    })
  }

  newDataQuote() {
    this.router.navigateByUrl(`/home/conversion/nueva-cotizacion`)
  }

  moneyAccount(data:any) {
    let objData:any = {
      payment_date: new Date(),
      status_id : 'f4fa3c48-8b48-4d39-ad09-a6699a66459f',
      quote_id : data.id,
      company_id : data.companyName.id,
    }
    
    this.notificationService
    .notificacion(
      'Pregunta',
      '¿Estás seguro que el dinero ya está en la cuenta bancaria?',
      'question',
    )
    .afterClosed()
    .subscribe((response) => {
      if (response) {
        this.moduleServicesQuote.moneyAccount({quote: objData}).subscribe({
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

  selectOption(option: string) {
    this.filterDayMonthYear = option;
    this.searchWithFilters();
  }

  onTabChange(event: MatTabChangeEvent): void {
    console.log(event.tab.textLabel);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
