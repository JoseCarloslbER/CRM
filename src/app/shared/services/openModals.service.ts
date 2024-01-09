import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationDialogComponent } from '@fuse/services/confirmation/dialog/dialog.component';

@Injectable({
	providedIn: 'root',
})
export class OpenModalsService {
	constructor(private dialog: MatDialog) {}

	notificacion(title: string, message: string, type: string) {
		const data = {
			title,
			message,
			icon : {
				show : true,
				name : type == 'save' ? 'mat_outline:save' : 'mat_outline:delete',
				color : type == 'save' ? 'success' : 'warn' 
			},
			actions : {
				confirm : {
				  show  : true,
				  label : 'Aceptar',
				  color : 'accent'
				},
				cancel : {
				  show : false
				}
			}
		};

		return this.dialog.open(FuseConfirmationDialogComponent, {
			data,
			disableClose: true,
			panelClass: 'custom-dialog',
		});
	}

	closeDialog() {
		return this.dialog.closeAll();
	}
}
