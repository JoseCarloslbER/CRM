import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { DateTime } from 'luxon';
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
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrl: './calls.component.scss'
})
export class CallsComponent implements OnInit {
  private onDestroy = new Subject<void>();
  
  @Input() idCompany:string = '';

  public calls : GetDataDetailsHistoryMapper[] = [];
  public catActivityType: entityGeneral.DataCatActivityType[] = [];

  public searchBar = new FormControl('')
  public activityType = new FormControl('')

  activities = [
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Llamada',
      period : [
        {
          start : '18:01',
          end : '18:20',
        }
      ],
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Llamada',
      period : [
        {
          start : '18:01',
          end : '18:20',
        }
      ],
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Llamada',
      period : [
        {
          start : '18:01',
          end : '18:20',
        }
      ],
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Llamada',
      period : [
        {
          start : '18:01',
          end : '18:20',
        }
      ],
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Llamada',
      period : [
        {
          start : '18:01',
          end : '18:20',
        }
      ],
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Llamada',
      period : [
        {
          start : '18:01',
          end : '18:20',
        }
      ],
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Llamada',
      period : [
        {
          start : '18:01',
          end : '18:20',
        }
      ],
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Llamada',
      period : [
        {
          start : '18:01',
          end : '18:20',
        }
      ],
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Llamada',
      period : [
        {
          start : '18:01',
          end : '18:20',
        }
      ],
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Llamada',
      period : [
        {
          start : '18:01',
          end : '18:20',
        }
      ],
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Llamada',
      period : [
        {
          start : '18:01',
          end : '18:20',
        }
      ],
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    {
      id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
      activity: 'Llamada',
      period : [
        {
          start : '18:01',
          end : '18:20',
        }
      ],
      agent: 'AgenteATCAle',
      description: "Se cancela la Cot#1042 debido a que ya se venció y no se obtuvo respuesta por parte del cliente.",
      date: "2023-12-31T07:42:37.155-06:00",
    },
    
  ]
  
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
    const filtros = `company_id=${ this.idCompany }&activity_type_id=fde5d736-c7ad-4ccc-9037-d742aa3b8a44`
    
    this.moduleServices.getDataHistoryCalls(filtros).subscribe({
      next: ( data : GetDataDetailsHistoryMapper[]) => {
        this.calls = data
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

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
