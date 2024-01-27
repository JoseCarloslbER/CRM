import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalNewCompanyTypeComponent } from './modal-new-company-type/modal-new-company-type.component';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-company-categories',
  templateUrl: './company-categories.component.html',
})
export class CompanyCategoriesComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  constructor(
    private notificationService : OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
    
  }



  newData() {
    this.dialog.open(ModalNewCompanyTypeComponent, {
      data: null,
      disableClose: true,
      width: '1000px',
      maxHeight: '428px',
      panelClass: 'custom-dialog',
    });
  }
  
  deleteData() {
    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estas seguro de eliminar el registro?',
        'question',
      )
      .afterClosed()
      .subscribe((_) => {
        this.notificationService
          .notificacion(
            'Éxito',
            'Registro eliminado.',
            'delete',
          )
          .afterClosed()
          .subscribe((_) => {

          });
      });
  }

  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
