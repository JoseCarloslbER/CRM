import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalInformationInTableComponent } from 'app/pages/catchment/campaigns/modal-information-in-table/modal-information-in-table.component';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-campingn',
  templateUrl: './new-campingn.component.html',
  styleUrl: './new-campingn.component.scss'
})
export class NewCampingnComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public fechaHoy = new Date();
  public toppings = new FormControl('');
  public selectCompanies = new FormControl('');
  public toppingList: string[] = ['Empresa A', 'Empresa B', 'Empresa C'];

  public url = document.location.href;

  public formFilters = this.formBuilder.group({
    type: [null],
    giro: [null],

  });

  public formData = this.formBuilder.group({
    code: [null],
    amountInvested: [null],
    agentCharge: [null, Validators.required],
    agents: [null],
    solution: [null, Validators.required],
    campaignName: [null, Validators.required],
    type: [null, Validators.required],
    periodStart: [null, Validators.required],
    periodEnd: [null, Validators.required],
    companies: [null, Validators.required],
    description: [null, Validators.required],
    totalCompanies: [null, Validators.required],
    numberResponses: [null, Validators.required],
    numberQuotes: [null, Validators.required],
    numberClose: [null, Validators.required],
    totalAmount: [null, Validators.required],
  });

  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  save(){
    console.log(this.formData.value);
    
    this.notificationService
      .notificacion(
        'Éxito',
        `Registro ${this.url.includes('editar') ? 'editado' : 'guardado'}.`,
        'save',
      )
      .afterClosed()
      .subscribe((_) => {
        this.toBack()
      });
  }

  
  toBack(){
    this.router.navigateByUrl(`/home/captacion/campanias`)
  }


  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
