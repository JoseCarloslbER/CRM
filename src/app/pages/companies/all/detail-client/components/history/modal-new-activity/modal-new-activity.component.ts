import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject } from 'rxjs';
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
    company: [null],
    user: [null],
    type_activity: [null],
    campaign: [null],
  });

  public catAgents: entityGeneral.DataCatAgents[] = [];
  public catCampaing: entityGeneral.DataCatCampaing[] = [];
  public catCompanyType: TableDataActivityType[] = [];

  constructor(
    private moduleServices: CompaniesService,
    private formBuilder: FormBuilder,
    private notificationService: OpenModalsService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>
	) { }

  
  ngOnInit(): void {
    console.log(this.data);

    this.getCatalogs()
  }

  getCatalogs() {
    this.moduleServices.getCatCampaing().subscribe({
      next: (data: entityGeneral.DataCatCampaing[]) => {
        this.catCampaing = data;
        console.log('Campaing', data);
        
      },
      error: (error) => console.error(error)
    });
    
    this.moduleServices.getCatActivityType().subscribe({
      next: (data: TableDataActivityType[]) => {
        this.catCompanyType = data;
        console.log('CompanyType', data);
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatAgents().subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catAgents = data;
        console.log('CompanyType', data);
      },
      error: (error) => console.error(error)
    });
  }


  save() {
    this.notificationService
      .notificacion(
        'Éxito',
        'Registro guardado.',
        'save',
      )
      .afterClosed()
      .subscribe((_) => {
        this.closeModal()
      });
  }

  closeModal() {
		this.dialogRef.close({
      close : true
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
