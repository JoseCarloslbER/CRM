import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { modalInfoTable } from 'app/shared/interfaces/TableColumns';

@Component({
  selector: 'app-modal-campaign-results',
  templateUrl: './modal-campaign-results.component.html',
  styleUrl: './modal-campaign-results.component.scss'
})
export class ModalCampaignResultsComponent {
  constructor(
		@Inject(MAT_DIALOG_DATA) public data: modalInfoTable,
		private dialogRef: MatDialogRef<any>,
	) {
  }

  ngOnInit(): void {
    console.log(this.data.info);
    
  }

  closeModal() {
		this.dialogRef.close({
      close : true
    })
  }
}
