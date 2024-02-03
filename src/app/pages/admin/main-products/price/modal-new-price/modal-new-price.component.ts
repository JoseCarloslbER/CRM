import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import * as entity from '../../../admin-interface';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from 'app/pages/admin/admin.service';

@Component({
  selector: 'app-modal-new-price',
  templateUrl: './modal-new-price.component.html',
  styleUrl: './modal-new-price.component.scss'
})
export class ModalNewPriceComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public formData = this.formBuilder.group({
    code: [null, Validators.required],
    price: [null, Validators.required],
    tax_percentage: [null, Validators.required],
    currency: [null, Validators.required],
    status_id: [null, Validators.required],
  });

  private idData: string = '';
  private objEditData : entity.GetDataPrice;

  constructor(
    private moduleServices: AdminService,
    private formBuilder: FormBuilder,
    private notificationService: OpenModalsService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {	}

  ngOnInit(): void {
    console.log(this.data?.idEdit);
    
    if (this.data?.idEdit) {
      this.idData = this.data.idEdit
      this.getDataId();
    }
  }

  actionSave() {
    console.log('FORM', this.formData.value);
    
    let objData : any = {
      ...this.formData.value,
    }

    console.log(objData);
    this.completionMessage(true);

    // if (this.idData) this.saveDataPatch(objData)
    //  else this.saveDataPost(objData)
  }

  getDataId() {
    this.moduleServices.getDataPriceId(this.idData).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: any) => {
        this.objEditData = response;
        this.formData.patchValue(response)
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  saveDataPost(objData:entity.PostDataPrice) {
    this.moduleServices.postDataPrice(objData).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: any) => {
        this.completionMessage()
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  saveDataPatch(objData:entity.PostDataPrice) {
    this.moduleServices.patchDataPrice(this.idData, objData).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: any) => {
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
        `Registro ${edit ? 'editado' : 'guardado'}.`,
        'save',
      )
      .afterClosed()
      .subscribe((_) => { this.closeModal() });
  }

  closeModal() {
		this.dialogRef.close({ close : true })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
