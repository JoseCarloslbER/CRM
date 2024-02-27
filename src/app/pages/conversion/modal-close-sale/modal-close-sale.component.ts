import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UpdateComponentsService } from 'app/shared/services/updateComponents.service';
import { FormBuilder, Validators } from '@angular/forms';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { ConversionService } from '../conversion.service';

@Component({
  selector: 'app-modal-close-sale',
  templateUrl: './modal-close-sale.component.html',
  styleUrl: './modal-close-sale.component.scss'
})
export class ModalCloseSaleComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public objEditData : any;

  
  public formData = this.formBuilder.group({
    end_date: [null, Validators.required],
    finish  : [true]
  });

  constructor(
    private moduleServices: ConversionService,
    private formBuilder: FormBuilder,
    private notificationService: OpenModalsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>
  ) { }
  
  ngOnInit(): void {
    console.log(this.data);

    this.assignInformation();
  }

  assignInformation() {
    if (this.data.info) this.objEditData = this.data?.info;
  }

  actionSave() {
    let objData: any = {
      ...this.formData.value,
      end_date : moment(this.formData.get('end_date').value).format('YYYY-MM-DD')
    }

    console.log(objData);
    // this.saveDataPatch(objData);
      
  }

  saveDataPost(objData:any) {
    console.log(this.objEditData);
    this.moduleServices.postDataMoneyAccount(objData).subscribe({
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
