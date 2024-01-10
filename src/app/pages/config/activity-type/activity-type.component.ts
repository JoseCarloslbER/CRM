import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ModalnewActivityComponent } from './modalnew-activity/modalnew-activity.component';

@Component({
  selector: 'app-activity-type',
  templateUrl: './activity-type.component.html',
  styles: `
  .c-config {
    padding: 20px 40px;

    .bg-card {
        height: calc(100vh - 100px);
    }
}`
})
export class ActivityTypeComponent {

  constructor(

    private openModalsService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  newData() {
    this.dialog.open(ModalnewActivityComponent, {
      data: ['test'],
      disableClose: true,
      width: '1000px',
      maxHeight: '428px',
      panelClass: 'custom-dialog',
    });
  }
}
