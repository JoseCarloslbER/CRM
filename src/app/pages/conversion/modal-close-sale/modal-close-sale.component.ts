import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UpdateComponentsService } from 'app/shared/services/updateComponents.service';
import { FormBuilder, Validators } from '@angular/forms';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { ConversionService } from '../conversion.service';
import * as entity from '../conversion-interface';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import { CatalogsService } from 'app/shared/services/catalogs.service';

@Component({
  selector: 'app-modal-close-sale',
  templateUrl: './modal-close-sale.component.html',
  styleUrl: './modal-close-sale.component.scss'
})
export class ModalCloseSaleComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public objEditData : any;

  
  public catWayToPay: entityGeneral.DataCatWayToPay[] = [];
  public catPaymentMethod: entityGeneral.DataCatPaymentMethod[] = [];
  public catPaymentCondiction: entityGeneral.DataCatPaymentCondition[] = [];
  public catInvoiceUse: entityGeneral.DataCatInvoiceUse[] = [];

  public formData = this.formBuilder.group({
    company_name: [null, Validators.required],
    quote_option_id: [null, Validators.required],
    payment_method_id: [null, Validators.required],
    way_to_pay_id: [null, Validators.required],
    payment_condition_id: [null, Validators.required],
    invoice_use_id: [null, Validators.required],
    tax_id_number: [null, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],

  });

  constructor(
    private moduleServices: ConversionService,
    private catalogsServices: CatalogsService,
    private formBuilder: FormBuilder,
    private notificationService: OpenModalsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>
  ) { }
  
  ngOnInit(): void {
    console.log(this.data.info);
    this.assignInformation();
  }


  assignInformation() {
    if (this.data.info) {
      this.objEditData = this.data?.info;
      this.formData.patchValue(this.data?.info?.closeSale[0]?.company)
    }
    setTimeout(() => {
      this.getCatalogs()
    }, 500);
  }

  getCatalogs() {
    this.catalogsServices.getCatDataWayToPay().subscribe({
      next: (data: entityGeneral.DataCatWayToPay[]) => {
        this.catWayToPay = data;
      },
      error: (error) => console.error(error)
    });
    
    this.catalogsServices.getCatPaymentMethod().subscribe({
      next: (data: entityGeneral.DataCatPaymentMethod[]) => {
        this.catPaymentMethod = data;
      },
      error: (error) => console.error(error)
    });
   
    this.catalogsServices.getCatPaymentCondition().subscribe({
      next: (data: entityGeneral.DataCatPaymentCondition[]) => {
        this.catPaymentCondiction = data;
      },
      error: (error) => console.error(error)
    });
   
    this.catalogsServices.getCatInvoiceUse().subscribe({
      next: (data: entityGeneral.DataCatInvoiceUse[]) => {
        this.catInvoiceUse = data;
      },
      error: (error) => console.error(error)
    });
  }

  actionSave() {
    let objData: any = {
      ...this.formData.value,
      status_id: '2b95f05d-64d4-4b36-a51c-a3ca7c6bdc72'
    }

    console.log(objData);
    this.saveDataPost(objData);
      
  }

  saveDataPost(objData:any) {
    console.log(this.objEditData);
    this.moduleServices.closeSale(objData).subscribe({
      next: () => {
        this.completionMessage(true)
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  completionMessage(edit = false) {
    this.notificationService
      .notificacion(
        'Éxito',
        `Registro actualizado.`,
        'save',
      )
      .afterClosed()
      .subscribe((_) => this.closeModal());
  }

  closeModal() {
    this.dialogRef.close({ close: true })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
