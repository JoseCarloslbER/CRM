import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-new-campaing-categories',
  templateUrl: './modal-new-campaing-categories.component.html',
})
export class ModalNewCampaingCategoriesComponent implements OnInit{
  constructor(
    private notificationService: OpenModalsService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {
	}

  ngOnInit(): void {
    console.log(this.data);
  }

  save() {
    this.notificationService
      .notificacion(
        'Éxito',
        'Documento guardado.',
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

}
