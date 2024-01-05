import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
