import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Observable, Subject, map, startWith, takeUntil } from 'rxjs';
import * as entityGeneral from '../../../../../../../shared/interfaces/general-interface';
import * as entityManager from '../../../../../../management/management-interface';
import { TableDataActivityType } from 'app/pages/config/config-interface';
import { ManagementmentService } from 'app/pages/management/management.service';
import moment from 'moment';
import { UpdateComponentsService } from 'app/shared/services/updateComponents.service';
import { ReactivationService } from 'app/pages/reactivation/reactivation.service';
import { CatalogsService } from 'app/shared/services/catalogs.service';

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
export class ModalNewActivityComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();
  public filteredOptions: Observable<any[]>;

  public formData = this.formBuilder.group({
    description: [null, Validators.required],
    activity_date: [null],
    activity_hour: [null],
    company: [null, Validators.required],
    user: [null, Validators.required],
    type_activity: [null],
    campaign: [null, Validators.required],
    quote: [{ value: null, disable: true }],
  });
  
  public company = new FormControl(null);
  public img = new FormControl(null);

  public catAgents: entityGeneral.DataCatAgents[] = [];
  public catQuoteOpens: entityGeneral.DataCatQuoteOpenList[] = [];
  public catCampaings: entityGeneral.DataCatCampaing[] = [];
  public catCompanyType: TableDataActivityType[] = [];
  public catCompanies: any[] = [];

  public objEditData: any;

  public companySelected : string = '';
  public idData : string = '';
  
  constructor(
    private moduleManagementServices: ManagementmentService,
    private moduleReactivationServices: ReactivationService,
    private updateService: UpdateComponentsService,
    private catalogsServices: CatalogsService,
    private formBuilder: FormBuilder,
    private notificationService: OpenModalsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.assignInformation();

    setTimeout(() => {
      this.getCatalogs() 
    }, 500);

    this.filteredOptions = this.company.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  
  ngAfterViewInit(): void {(
    this.company.valueChanges.pipe(takeUntil(this.onDestroy))).subscribe(content => {
      setTimeout(() => {
        if (this.companySelected) {
          this.formData.get('quote').enable();
          this.getQuotesOpens();
        } else {
          this.formData.get('quote').disable();
        }
      }, 500);
    })
  }

  assignInformation() {
    if (this.data?.info) {
      this.idData = this.data?.info?.id || this.data?.info?.activity_id;
      this.getDataById() 
    } 

    if (this.data?.complement) {
        this.companySelected = this.data.complement.id
        this.company.patchValue(this.data.complement.companyName)
        this.company.disable()
    }
  }

  getDataById() {
    this.moduleManagementServices.getDataId(this.idData).subscribe({
      next: (response: entityManager.GetDataActivitiesMapper) => {
        this.objEditData = response;
        this.formData.patchValue(this.objEditData);
        this.company.patchValue(this.objEditData.companyName)
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  getCatalogs() {
    this.catalogsServices.getCatCampaing().subscribe({
      next: (data: entityGeneral.DataCatCampaing[]) => {
        this.catCampaings = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatActivityType().subscribe({
      next: (data: TableDataActivityType[]) => {
        this.catCompanyType = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatAgents().subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catAgents = data;
      },
      error: (error) => console.error(error)
    });
    
    this.catalogsServices.getCatCompany().subscribe({
      next: (data: entityGeneral.DataCatCompany[]) => {
        this.catCompanies = data;
      },
      error: (error) => console.error(error)
    });
  }

  getQuotesOpens() {
    this.catalogsServices.getCatQuoteOpen(this.companySelected).subscribe({
      next: (response: entityGeneral.DataCatQuoteOpen) => {
        this.catQuoteOpens = response.data;
      },
      error: (error) => console.error(error)
    });
  }

  actionSave() {
    let objData :any = {
      ...this.formData.value,
      company : this.companySelected,
    }

    objData.activity_date = moment(this.formData.get('activity_date').value).format('YYYY-MM-DD');
    
    if (this.data.type == 'activities') {
      objData.process = 'Actividades';
      console.log(objData);
      this.saveDataPostPatchActivities(objData);

    } else if (this.data.type == 'calls') { 
      objData.process = 'Llamadas'
      this.saveDataPostPatchCallOrDaily(objData);

    } else {
      objData.process = 'Agenda';
      this.saveDataPostPatchCallOrDaily(objData);
    }
  }

  saveDataPostPatchActivities(objData: any) {
    this.saveData(this.objEditData, this.moduleManagementServices.postData(objData), this.moduleManagementServices.patchData(this.idData, objData));
  }
  
  saveDataPostPatchCallOrDaily(objData: any) {
    this.saveData(this.objEditData, this.moduleReactivationServices.postDataCallOrDaily(objData), this.moduleReactivationServices.patchDataCallOrDaily(this.idData, objData));
  }

  saveData(editData: any, postMethod: Observable<any>, patchMethod: Observable<any>) {
    const dataService = editData ? patchMethod : postMethod;
  
    dataService.subscribe({
      next: () => this.completionMessage(editData !== null),
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error');
        console.error(error);
      }
    });
  }

  private _filter(value: any): any[] {
    const filterValue = value?.toLowerCase();
    
    return this.catCompanies.filter(option => option?.company_name?.toLowerCase()?.includes(filterValue));
  }

  completionMessage(edit = false) {
    this.notificationService
      .notificacion(
        'Éxito',
        `Registro ${edit ? 'editado' : 'guardado'}.`,
        'save',
      )
      .afterClosed()
      .subscribe((_) => this.closeModal());
  }

  closeModal() {
    this.updateService.triggerUpdate(); 
    this.dialogRef.close({ close: true })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
