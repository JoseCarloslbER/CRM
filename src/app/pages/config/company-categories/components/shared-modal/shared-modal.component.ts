import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { ConfigService } from 'app/pages/config/config.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { modalInfoTable } from 'app/shared/interfaces/TableColumns';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrl: './shared-modal.component.scss'
})
export class SharedModalComponent implements OnInit {
  private onDestroy = new Subject<void>();
  
  public formData: FormGroup;

  private objEditData: any;

  constructor(
    private moduleServices: ConfigService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: modalInfoTable
  ) { }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({});
    this.assignInformation();
  }

  assignInformation() {
    
    if (this.data.type == 'origin') {
      this.formData.addControl('platform_name', this.formBuilder.control('', Validators.required));
    } else if (this.data.type == 'business') {
      this.formData.addControl('business_name', this.formBuilder.control('', Validators.required));
    } else if (this.data.type == 'size') {
      this.formData.addControl('size_name', this.formBuilder.control('', Validators.required));
    } else {
      this.formData.addControl('type_name', this.formBuilder.control('', Validators.required));
    }

    console.log(this.formData);
    
    this.objEditData = this.data.info;
    this.formData.patchValue(this.objEditData)
  }

  actionSave() {
    let objData: any = {
      ...this.formData.value
    }

    if (this.objEditData) this.saveDataPatch(objData)
    else this.saveDataPost(objData)
  }

  saveDataPost(objData) {
    this.moduleServices.postDataCampaingType(objData).subscribe({
      next: () => {
        this.completionMessage()
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  saveDataPatch(objData) {
    this.moduleServices.patchDataCampaingType(this.objEditData.campaign_type_id, objData).subscribe({
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
