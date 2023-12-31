import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrl: './calls.component.scss'
})
export class CallsComponent {


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
    
  ]




  isSameDay(current: string, compare: string): boolean {
    return DateTime.fromISO(current).hasSame(DateTime.fromISO(compare), 'day');
  }

  getRelativeFormat(date: string): string {
    return DateTime.fromISO(date).toRelativeCalendar();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
