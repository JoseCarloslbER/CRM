import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-quote-or-client',
  templateUrl: './new-quote-or-client.component.html',
  styleUrl: './new-quote-or-client.component.scss'
})
export class NewQuoteOrClientComponent {

  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }


  ngAfterViewInit(): void {
  }

  save(){
    this.notificationService
      .notificacion(
        'Éxito',
        'Registro guardado.',
        'save',
      )
      .afterClosed()
      .subscribe((_) => {
        this.toBack()
      });
  }

  
  toBack(){
    this.router.navigateByUrl(`/home/conversion/detalle-cotizacion/1`)
  }
}
