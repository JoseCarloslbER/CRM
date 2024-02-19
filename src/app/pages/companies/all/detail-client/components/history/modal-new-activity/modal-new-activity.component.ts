import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Observable, Subject, debounceTime, map, startWith } from 'rxjs';
import * as entityGeneral from '../../../../../../../shared/interfaces/general-interface';
import { CompaniesService } from 'app/pages/companies/companies.service';
import { TableDataActivityType } from 'app/pages/config/config-interface';

@Component({
  selector: 'app-modal-new-activity',
  templateUrl: './modal-new-activity.component.html',
  styles: [`
      .up {
        display: flex;
        height: 71px;
        align-items: flex-end;
      }
  `]
})
export class ModalNewActivityComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public formData = this.formBuilder.group({
    description: [null],
    activity_date: [null],
    activity_hour: [null],
    company: [null, Validators.required],
    user: [null, Validators.required],
    type_activity: [null],
    campaign: [null, Validators.required],
  });

  public catAgents: entityGeneral.DataCatAgents[] = [];
  public catCampaing: entityGeneral.DataCatCampaing[] = [];
  public catCompanyType: TableDataActivityType[] = [];
  // public catCompanies: entityGeneral.DataCatCompany[] = [];
  
  public catCompanies: any[] = [];
  company = new FormControl(null);
  filteredOptions: Observable<any[]>;
  public companySelected : string = '';
  
  constructor(
    private moduleServices: CompaniesService,
    private formBuilder: FormBuilder,
    private notificationService: OpenModalsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    console.log(this.data);

    setTimeout(() => {
      
      this.getCatalogs() 
    }, 100);

    this.filteredOptions = this.company.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  getCatalogs() {
    this.moduleServices.getCatCampaing().subscribe({
      next: (data: entityGeneral.DataCatCampaing[]) => {
        this.catCampaing = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatActivityType().subscribe({
      next: (data: TableDataActivityType[]) => {
        this.catCompanyType = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatAgents().subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catAgents = data;
      },
      error: (error) => console.error(error)
    });
    
    this.moduleServices.getCatCompany().subscribe({
      next: (data: entityGeneral.DataCatCompany[]) => {
        this.catCompanies = data;
        console.log('Company', data);
      },
      error: (error) => console.error(error)
    });
  }

  save() {
    console.log(this.company.value);
    let objData :any = {
      ...this.formData.value,
      company : this.companySelected
    }

    console.log(objData);
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.catCompanies.filter(option => option.companyName.toLowerCase().includes(filterValue));
  }

  closeModal() {
    this.dialogRef.close({
      close: true
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
