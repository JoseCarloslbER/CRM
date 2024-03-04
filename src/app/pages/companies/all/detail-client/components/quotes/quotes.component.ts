import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CompaniesService } from 'app/pages/companies/companies.service';
import { ConversionService } from 'app/pages/conversion/conversion.service';

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
export class QuotesComponent implements OnInit {
  private onDestroy = new Subject<void>();
  
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  @Input() idCompany:string = '';
 
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

  public searchBar = new FormControl('')


  constructor(
    private moduleServices: CompaniesService,
    private moduleServicesQuote: ConversionService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.idCompany);
    
    if (this.idCompany) this.getDataTable()
  }
  
  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      console.log(content);
    })
  }

  getDataTable() {
    this.moduleServicesQuote.getDataDetailQuoteTable(`company_id=${ this.idCompany }`).subscribe({
      next: ( data : any) => {
        this.dataSource.data = data
        console.log(data);
        
      },
      error: (error) => console.error(error)
    })
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
        this.moduleServicesQuote.acceptQuote({quote : data}).subscribe({
          next: () => {
              this.notificationService
              .notificacion(
                'Éxito',
                'Cotización aceptada.',
                'save',
              )
              .afterClosed()
              .subscribe((_) => this.getDataTable());
          },
          error: (error) => console.error(error)
        })
      }
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
              .subscribe((_) => this.getDataTable());
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

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
