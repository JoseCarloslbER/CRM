import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpenModalsService } from 'app/shared/services/openModals.service';

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
export class ModalNewActivityComponent {


  constructor(
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

  closeModal() {
		this.dialogRef.close({
      close : true
    })
  }
}
