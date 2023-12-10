import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrl: './titles.component.scss'
})
export class TitlesComponent {

  @Input() infoTitle!: string;
	@Input() infoRuta!: string;
	@Input() state!: any;
	@Input() infoModal!: {
		titulo: string;
		texto: string;
		tipo: string;
	};
	@Input() clearStorage!: boolean;

	constructor(private router: Router) {}

  goBack() {
	// 	if (this.state && this.infoModal) {
	// 		this.servicioNotificacion
	// 			.notificacion(this.infoModal.titulo, this.infoModal.texto, this.infoModal.tipo)
	// 			.afterClosed()
	// 			.subscribe((response) => {
	// 				if (response) {
	// 					this.router.navigate([`/${this.infoRuta}`], {
	// 						state: this.state,
	// 					});

	// 					if (this.clearStorage) {
	// 						sessionStorage.clear();
	// 					}
	// 				}
	// 			});
	// 	} else if (this.state) {
	// 		this.router.navigate([`/${this.infoRuta}`], {
	// 			state: this.state,
	// 		});

	// 		if (this.clearStorage) {
	// 			sessionStorage.clear();
	// 		}
	// 	} else if (this.infoModal) {
	// 		this.servicioNotificacion
	// 			.notificacion(this.infoModal.titulo, this.infoModal.texto, this.infoModal.tipo)
	// 			.afterClosed()
	// 			.subscribe((response) => {
	// 				if (response) {
	// 					this.router.navigate([`/${this.infoRuta}`]);

	// 					if (this.clearStorage) {
	// 						sessionStorage.clear();
	// 					}
	// 				}
	// 			});
	// 	} else {
	// 		this.router.navigate([`/${this.infoRuta}`]);

	// 		if (this.clearStorage) {
	// 			sessionStorage.clear();
	// 		}
	// 	}
	}
}
