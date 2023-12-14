import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
	providedIn: 'root',
})
export class OpenModalsService {
	constructor(private dialog: MatDialog) {}



	openModalMedium(componente: any, data: any) {
		return this.dialog.open(componente, {
			data,
			disableClose: true,
			width: '1000px',
			maxHeight: '628px',
			panelClass: 'custom-dialog',
		});
	}


	abrirModalPequenio(componente: any, data: any) {
		return this.dialog.open(componente, {
			data,
			disableClose: true,
			width: '360px',
			height: '300px',
			panelClass: 'custom-dialog',
		});
	}
	abrirModalPequenioMediano(componente: any, data: any) {
		return this.dialog.open(componente, {
			data,
			disableClose: true,
			width: '600px',
			maxHeight: '760px',
			panelClass: 'custom-dialog',
		});
	}

	abrirModalMediano(componente: any, data: any) {
		return this.dialog.open(componente, {
			data,
			disableClose: true,
			width: '1000px',
			height: '750px',
			panelClass: 'custom-dialog',
		});
	}

	abrirModalMedianoNuevo(componente: any, data: any) {
		return this.dialog.open(componente, {
			data,
			disableClose: true,
			width: '1000px',
			maxHeight: '750px',
			panelClass: 'custom-dialog',
		});
	}

	abrirModalGrande(componente: any, data: any) {
		return this.dialog.open(componente, {
			data,
			disableClose: true,
			width: '75%',
			height: '70%',
			panelClass: 'custom-dialog',
		});
	}

	// notificacion(titulo: string, texto: string, tipo: string) {
	// 	const data = {
	// 		titulo: titulo,
	// 		texto: texto,
	// 		tipo: tipo,
	// 	};

	// 	return this.dialog.open(ModalConfirmacionesComponent, {
	// 		data,
	// 		disableClose: true,
	// 		width: '450px',
	// 		height: '300px',
	// 		panelClass: 'custom-dialog',
	// 	});
	// }

	

	closeDialog() {
		return this.dialog.closeAll();
	}
}
