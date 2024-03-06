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

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrl: './pipeline.component.scss'
})
export class PipelineComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public formFilters = this.formBuilder.group({
    client: [{ value: null, disabled: false }],
    agent: [{ value: null, disabled: false }],
    status: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  public fechaHoy = new Date();

  public selectedOption: number | null = null;

  public dataPipele : any;

  constructor(
    private moduleServices: DashboardService,
    private moduleServicesQuote: ConversionService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchWithFilters()
  }

  ngAfterViewInit(): void {
    
  }

  searchWithFilters() {
    console.log(this.formFilters.value);
    this.getPipeline()
  }

  newDataQuote() {
    this.router.navigateByUrl(`/home/conversion/nueva-cotizacion`)
  }
  
  getPipeline(filters?:string) {
    this.moduleServices.getPipeline(filters).subscribe({
      next: (data : any) => {
        this.dataPipele = data;
        console.log(this.dataPipele);
        
        console.log(this.dataPipele.quoteClients);
        
      },
      error: (error) => console.error(error)
    })
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

  selectOption(option: number) {
    this.selectedOption = option;
  }

  onTabChange(event: MatTabChangeEvent): void {
    console.log(event.tab.textLabel);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
