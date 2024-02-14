import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewCompanyTypeComponent } from './modal-new-company-type/modal-new-company-type.component';
import { Subject } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SharedModalComponent } from './components/shared-modal/shared-modal.component';

@Component({
  selector: 'app-company-categories',
  templateUrl: './company-categories.component.html',
})
export class CompanyCategoriesComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();


  public selectedOption : string = '';

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    
  }

  onTabChange(event: MatTabChangeEvent): void {
    const option = event.tab.textLabel;

    if (option.includes('Origen')) {
      console.log('Origen');
      this.selectedOption = 'origin'
    } else if (option.includes('Giro')) {
      console.log('Giro');
      this.selectedOption = 'business'
    } else if (option.includes('Tamaño')) {
      console.log('Tamaño');
      this.selectedOption = 'size'
    } else {
      console.log('Tipo de cliente');
      this.selectedOption = 'clientType'
    }
  }

  // post 
  // origin : platform_name
  // giro : business_name
  // tamaño : size_name
  // tipo cliente : type_name

  newData(data = null) {
    this.dialog.open(SharedModalComponent, {
      data: {
        type : this.selectedOption,
        info: data
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '428px',
      panelClass: 'custom-dialog',
    });
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
