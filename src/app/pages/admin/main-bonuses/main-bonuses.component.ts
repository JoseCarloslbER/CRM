import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-main-bonuses',
  templateUrl: './main-bonuses.component.html',
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

  onTabChange(event: MatTabChangeEvent): void {
    if (event.tab.textLabel.includes('Bono')) this.isBono = true;
     else this.isBono = false;
  }

  douwnloadExel(){
    this.notificationService
          .notificacion(
            'Éxito',
            'Excel descargado.',
            'save',
            'heroicons_outline:document-arrow-down'
          )
          .afterClosed()
          .subscribe((_) => {

          });
  }



}
