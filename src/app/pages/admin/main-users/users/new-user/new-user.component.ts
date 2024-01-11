import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.scss'
})
export class NewUserComponent {
  public panelOpenState = false;
  
  constructor(
    private _fuseConfirmationService: FuseConfirmationService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
  ) { }


  save() {
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

  toBack() {
    this.router.navigateByUrl(`/home/admin/usuarios`)
  }
}
