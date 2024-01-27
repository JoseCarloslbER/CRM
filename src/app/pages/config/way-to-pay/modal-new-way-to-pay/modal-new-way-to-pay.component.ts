import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-new-way-to-pay',
  templateUrl: './modal-new-way-to-pay.component.html',
})
export class ModalNewWayToPayComponent implements OnInit{
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
        `Registro ${this.data.info ? 'editado' : 'guardado'}.`,
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
