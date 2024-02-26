import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarEvent, EventColor } from 'calendar-utils';
import { CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewActivityComponent } from 'app/pages/companies/all/detail-client/components/history/modal-new-activity/modal-new-activity.component';
import { ReactivationService } from '../reactivation.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import * as entity from '../reactivation-interface';


const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.scss'
})
export class DiaryComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;
  viewDate: Date = new Date();

  typeSeleccion: string = ''

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      // end: addDays(new Date(), 1),
      title: 'Reunión presentación de proyecto',
      // color: { ...colors.red },
      actions: this.actions,
      // allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      // draggable: true,
    },
    // {
    //   start: startOfDay(new Date()),
    //   title: 'Un evento sin fecha de finalización',
    //   color: { ...colors.yellow },
    //   actions: this.actions,
    // },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'Un largo evento que dura 2 meses.',
    //   color: { ...colors.blue },
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'Un evento arrastrable y redimensionable',
    //   color: { ...colors.yellow },
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];


  // Mostrar evento en el calendario. 
  public objetoAgenda  = {
    // color:{
    //   primary : "#ad2121",
    //   secondary : "#FAE3E3"
    // }  NO ES NECESARIO

    title : '', // description
    actions : this.actions, // editar o eliminar evento
    draggable : false // no se mueva el evento
  } 

  activeDayIsOpen: boolean = true;

  constructor(
    private moduleServices: ReactivationService,
    private modal: NgbModal,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getDataTable();
  }

  ngAfterViewInit(): void {

  }

  getDataTable() {
    this.moduleServices.getDataTableDiary().subscribe({
      next: (data: any) => {
        console.log('AGENDA:', data[0]);
      },
      error: (error) => console.error(error)
    })
  }
  
  addEvent(): void {
    let event = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        actions : [
          {
            label: '<i class="fas fa-fw fa-pencil-alt"></i>',
            a11yLabel: 'Edit',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              this.handleEvent('Edited', event);
            },
          },
          {
            label: '<i class="fas fa-fw fa-trash-alt"></i>',
            a11yLabel: 'Delete',
            onClick: ({ event }: { event: CalendarEvent }): void => {
              this.events = this.events.filter((iEvent) => iEvent !== event);
              this.handleEvent('Deleted', event);
            },
          },
        ],
      },
    ];

    console.log('EVENTO: ', event);
    
    this.events = event
  }

  newOrEditData(data = null) {
    this.dialog.open(ModalNewActivityComponent, {
      data: {
        info: data,
        type: 'diary'
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
      .afterClosed()
      .subscribe((_) => this.getDataTable());
  }
  
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }


  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }



  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

}
