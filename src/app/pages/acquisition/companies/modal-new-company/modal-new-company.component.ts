import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-new-company',
  templateUrl: './modal-new-company.component.html',
  styleUrls: []
})
export class ModalNewCompanyComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
  ) {
  }

  closeModal() {
    this.dialogRef.close({
      close: true
    })
  }
}
