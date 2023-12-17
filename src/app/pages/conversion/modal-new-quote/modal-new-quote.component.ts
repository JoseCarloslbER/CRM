import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-new-quote',
  templateUrl: './modal-new-quote.component.html',
  styleUrl: './modal-new-quote.component.scss'
})
export class ModalNewQuoteComponent {

  constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {
  }

  closeModal() {
		this.dialogRef.close({
      close : true
    })
  }
}
