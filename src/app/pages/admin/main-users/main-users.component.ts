import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-users',
  templateUrl: './main-users.component.html',
})
export class MainUsersComponent {
  constructor(

    private openModalsService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  newData() {
  //   this.dialog.open(ModalnewActivityComponent, {
  //     data: ['test'],
  //     disableClose: true,
  //     width: '1000px',
  //     maxHeight: '428px',
  //     panelClass: 'custom-dialog',
  //   });
  }
}
