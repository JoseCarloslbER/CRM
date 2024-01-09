import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-details-quotes',
  templateUrl: './details-quotes.component.html',
  styleUrl: './details-quotes.component.scss'
})
export class DetailsQuotesComponent {

  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }


  sendEmail(){
    this.notificationService
      .notificacion(
        'Éxito',
        'Correo enviado.',
        'save',
      )
      .afterClosed()
      .subscribe((_) => {
      });
  }

}
