import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'app/pages/admin/admin.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject, takeUntil } from 'rxjs';
import * as entity from '../../../admin-interface';

@Component({
  selector: 'app-modal-new-product',
  templateUrl: './modal-new-product.component.html',
  styleUrl: './modal-new-product.component.scss'
})
export class ModalNewProductComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public formData = this.formBuilder.group({
    code: [null, Validators.required],
    name: [null, Validators.required],
    price: [null, Validators.required],
    link: [null, Validators.required],
    product_category_id: [null, Validators.required],
    country_id: [null, Validators.required],
    status_id: [null, Validators.required]
  });

  private idData: string = '';

  private objEditData : any;

  constructor(
    private moduleServices: AdminService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private notificationService: OpenModalsService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {	}

  ngOnInit(): void {
  }
  
 
  actionSave() {

    console.log('FORM', this.formData.value);
    
    let objData : any = {
      ...this.formData.value,
    }

    console.log(objData);

    // if (this.idData) this.saveDataPatch(objData)
    //  else this.saveDataPost(objData)
  }

  saveDataPost(objData:entity.PostDataProduct) {
    this.moduleServices.postDataProduct(objData).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: any) => {
        this.completionMessage()
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  saveDataPatch(objData:entity.PostDataProduct) {
    this.moduleServices.patchDataProduct(this.idData, objData).pipe(takeUntil(this.onDestroy)).subscribe({
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
      .subscribe((_) => {
        this.toBack()
      });
  }

  toBack() {
    this.router.navigateByUrl(`/home/empresas/prospectos`)
  }

  toAll() {
    this.router.navigateByUrl(`/home/empresas/todos`)
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
