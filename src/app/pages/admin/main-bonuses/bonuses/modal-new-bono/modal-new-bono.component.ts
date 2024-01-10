import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-new-bono',
  templateUrl: './modal-new-bono.component.html',
  styleUrl: './modal-new-bono.component.scss'
})
export class ModalNewBonoComponent {
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
