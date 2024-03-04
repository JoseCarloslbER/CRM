import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { ModalNewActivityComponent } from './modal-new-activity/modal-new-activity.component';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConversionService } from 'app/pages/conversion/conversion.service';
import { CompaniesService } from 'app/pages/companies/companies.service';
import { FormControl } from '@angular/forms';
import { CatalogsService } from 'app/shared/services/catalogs.service';
import * as entityGeneral from '../../../../../../shared/interfaces/general-interface';
import { GetDataDetailsHistoryMapper } from 'app/pages/companies/companies-interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  private onDestroy = new Subject<void>();
  
  @Input() idCompany:string = '';

  public history : GetDataDetailsHistoryMapper[] = [];
  public catActivityType: entityGeneral.DataCatActivityType[] = [];

  public searchBar = new FormControl('')

  constructor(
    private moduleServices: CompaniesService,
    private catalogsServices: CatalogsService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log(this.idCompany);
    if (this.idCompany) this.getDataTable()
    this.getCatalogs()
  }

  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      console.log(content);
    })
  }

  getCatalogs() {
    this.catalogsServices.getCatActivityType().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatActivityType[]) => {
        this.catActivityType = data;
      },
      error: (error) => console.error(error)
    });
  }

  getDataTable() {
    this.moduleServices.getDataHistory(`company_id=${ this.idCompany }`).subscribe({
      next: ( data : GetDataDetailsHistoryMapper[]) => {
        this.history = data
      },
      error: (error) => console.error(error)
    })
  }
  
  isSameDay(current: string, compare: string): boolean {
    return DateTime.fromISO(current).hasSame(DateTime.fromISO(compare), 'day');
  }

  getRelativeFormat(date: string): string {
    return DateTime.fromISO(date).toRelativeCalendar();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  newActivity() {
    this.dialog.open(ModalNewActivityComponent, {
      data: null,
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
    .afterClosed()
    .subscribe((_) => this.getDataTable());
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}