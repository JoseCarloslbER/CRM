import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-new-contact',
  templateUrl: './modal-new-contact.component.html',
  styleUrls: []
})
export class ModalNewContactComponent implements OnInit {


  constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {
	
	}

  ngOnInit(): void {
    console.log(this.data);
  }

  closeModal() {
		this.dialogRef.close({
      close : true
    })
  }
}
