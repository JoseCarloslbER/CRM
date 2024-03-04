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

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  private onDestroy = new Subject<void>();
  
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  @Input() idCompany:string = '';

  public searchBar = new FormControl('')
  
  activities = [
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Actividad 1',
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Actividad 1',
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Actividad 1',
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Actividad 1',
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
  ]

  constructor(
    private moduleServices: CompaniesService,
    private moduleServicesQuote: ConversionService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
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
    console.log('getDataTable history');
    
    this.moduleServices.getDataHistory(`company_id=${ this.idCompany }`).subscribe({
      next: ( data : any) => {
        console.log(data);
        
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
      data: ['test'],
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}