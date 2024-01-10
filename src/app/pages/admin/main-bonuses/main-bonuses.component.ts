import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-bonuses',
  templateUrl: './main-bonuses.component.html',
  styleUrl: './main-bonuses.component.scss'
})
export class MainBonusesComponent {
  public fechaHoy = new Date();

  public isBono :boolean = true;
  
  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  newData() {
    this.router.navigateByUrl(`/home/admin/nuevo-bono`)
  }

  typeSelection(isBono:boolean) {
    this.isBono = isBono
  }

}
