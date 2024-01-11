import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpenModalsService } from 'app/shared/services/openModals.service';

@Component({
  selector: 'app-modal-new-product',
  templateUrl: './modal-new-product.component.html',
  styleUrl: './modal-new-product.component.scss'
})
export class ModalNewProductComponent {

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private notificationService: OpenModalsService,

		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {
	
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

}
