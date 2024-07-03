import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ModalNewProductComponent } from './modal-new-product/modal-new-product.component';
import { Subject, Subscription, debounceTime, takeUntil } from 'rxjs';
import { AdminService } from '../../admin.service';
import * as entity from '../../admin-interface';
import { UpdateComponentsService } from 'app/shared/services/updateComponents.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();
  private updateSubscription: Subscription;

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;
  public pageSize = 20;
  public currentPage = 0;
  public pageNext = 1;
  public pagePrevious = 0;
  public filters = "page=1";

  public displayedColumns: string[] = [
    'code',
    'name',
    'list_price',
    'country',
    'link',
    'actions'
  ];

  public searchBar = new FormControl('')

  constructor(
    private updateService: UpdateComponentsService,
    private moduleServices: AdminService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.updateSubscription = this.updateService.updateEvent$.subscribe(() => {
      this.getDataTable(this.filters);
    });
    this.getDataTable(this.filters);
  }

  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      this.applyFilter(content)
    })
  }

  getDataTable(filters: string) {    
    this.moduleServices.getDataTableProducts(filters).subscribe({
        next: (data : entity.TableDataProductResponse) => {
          console.log(data);
          this.dataSource.data = data.results;
          this.pageSize = data.page_size;
          this.pagePrevious = data.previous;
          this.pageNext = data.next;
          this.total = data.count;
        },
        error: (error) => console.error(error)
      })
  }

  editData(data:any) {
    this.dialog.open(ModalNewProductComponent, {
      data: {
        info: data
      },
      disableClose: true,
      width: '800px',
      maxHeight: '628px',
      panelClass: 'custom-dialog'
    })
    .afterClosed()
    .subscribe((_) => this.getDataTable(this.filters));
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
        this.moduleServices.deleteDataProduct(id).subscribe({
          next: () => {
              this.notificationService
              .notificacion(
                'Éxito',
                'Registro eliminado.',
                'delete',
              )
              .afterClosed()
              .subscribe((_) => this.getDataTable(this.filters));
          },
          error: (error) => console.error(error)
        })
      }
    });
  }

  applyFilter(filterValue: string) {
      filterValue = filterValue.trim().toLowerCase();
      this.dataSource.filter = filterValue;
    }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pageNext = this.currentPage + 1;
    this.filters = "page=" + this.pageNext;
    this.getDataTable(this.filters)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
