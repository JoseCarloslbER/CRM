import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-mailbox',
  templateUrl: './modal-mailbox.component.html',
  styleUrl: './modal-mailbox.component.scss'
})
export class ModalMailboxComponent {

  constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {
	
	}

  ngOnInit(): void {
    console.log(this.data);
  }

  public saveDraft() {

  }

  public send() {

  }

  public closeModal() {
		this.dialogRef.close({
     
    })
  }
}


// <div class="row d-flex mt-6">
// <div class="col-md-12 col-sm-12 col-12 section-btns-two">
//     <button class="btn-gray" (click)="saveDraft()">
//         <span>Guardar borrador</span>
//     </button>
// </div>
// </div>

// <div class="row d-flex justify-content-end">
// <div class="d-flex justify-content-end col-md-2 col-xl-2 col-12 pt-md-2">
//     <button class="btn-action-add" (click)="send()">
//         <span>Enviar</span>
//     </button>
// </div>
// </div>