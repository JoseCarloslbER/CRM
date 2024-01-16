import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalInformationInTableComponent } from 'app/pages/catchment/campaigns/modal-information-in-table/modal-information-in-table.component';
import { OpenModalsService } from 'app/shared/services/openModals.service';

@Component({
  selector: 'app-new-campingn',
  templateUrl: './new-campingn.component.html',
  styleUrl: './new-campingn.component.scss'
})
export class NewCampingnComponent implements AfterViewInit {

  public fechaHoy = new Date();
  toppings = new FormControl('');
  toppingList: string[] = ['Empresa A', 'Empresa B', 'Empresa C'];

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
    this.router.navigateByUrl(`/home/captacion/campañias`)
  }
}
