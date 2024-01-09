import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-upload-document',
  templateUrl: './modal-upload-document.component.html',
  styleUrl: './modal-upload-document.component.scss'
})
export class ModalUploadDocumentComponent {
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
