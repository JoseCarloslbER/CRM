import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ModalNewProductComponent } from './products/modal-new-product/modal-new-product.component';
import { ModalNewPriceComponent } from './price/modal-new-price/modal-new-price.component';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { AdminService } from '../admin.service';
import { DataTable } from '../admin-interface';

@Component({
  selector: 'app-main-products',
  templateUrl: './main-products.component.html',
  styleUrl: './main-products.component.scss'
})
export class MainProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();
  
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'fechaYHora',
    'informacion',
    'empresa',
    'statusCompany',
    'totalPrice',
    
    'products',
    'estadopais',
    'acciones',
    'operaciones'
  ];

  public dataDummy: any[] = [
    {
      empresa: 'RECK SOLUCIONES',
      fechaYHora: '2023-09-30 12:38:49',
      statusCompany: 'Cliente',
      precioTotal: '$4,000,000.00',
      estatus: 'LEAD',
      estadopais: 'Mexico, Nuevo Leon',
      totalPrice: [
        {
          op: ' $12354.00',
          expires: '2023-09-30',
        },
        {
          op: ' $12354.00',
          expires: '2023-09-30',
        }
      ],
      documentos: [
        {
          cotizacion: 'Cotización',
          cotizacionAprobada: 'Cotización aprobada',
        }
      ],
      informacion: [
        {
          numero: 'Cotización',
          status: 'Aprobada',
          cotizacionAprobada: 'Cotización aprobada',
        }
      ],
      lugares: [
        {
          no: '1548',
          tipo: 'Lista',
          lugares: '5',
          curso: 'C029 - Seguridad en el mantenimiento de instalaciones eléctrica',
          precio: '$1,995.00',
        }
      ],
    },
  

  ]

  public fechaHoy = new Date();
  
  public searchBar = new FormControl('')

  public selectionType : string = 'Productos'

  public formFilters = this.formBuilder.group({
    estatus: [{ value: null, disabled: false }],
    agent: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  constructor(
    private moduleServices: AdminService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.dataDummy;

  }

  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content:string) => {
      console.log(content);
    })
  }

  SearchWithFilters() {
    let objFilters:any = {
      ...this.formFilters.value
    }

    this.getDataTable(objFilters)
  }

  getCatalogs() {
    
  }

  getDataTable(filters:Object) {
    this.moduleServices.getDataTable(filters).subscribe({
        next: ({ data } : DataTable) => {
          console.log(data);
        },
        error: (error) => console.error(error)
      }
    )
  }
  
  onTabChange(event: MatTabChangeEvent): void {
    this.selectionType = event.tab.textLabel 
    
  }

  newData() {
    if (this.selectionType.includes('Productos')) {
      this.modalProducts()
    } else if(this.selectionType.includes('Precios')){
      this.modalPrice()
    } else {
      this.modalDiscounts()
    }
  }

  modalProducts() {
    this.dialog.open(ModalNewProductComponent, {
      data: {},
      disableClose: true,
      width: '800px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    });
  }

  modalPrice() {
    this.dialog.open(ModalNewPriceComponent, {
      data: {},
      disableClose: true,
      width: '800px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    });
  }

  modalDiscounts() {
    this.router.navigateByUrl(`/home/admin/nuevo-descuento`)
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

  get title() : string {
    return ''
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
