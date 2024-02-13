import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject, takeUntil } from 'rxjs';
import { CatchmentService } from '../../catchment.service';
import * as entity from '../../catchment-interface';

@Component({
  selector: 'app-new-campingn',
  templateUrl: './new-campingn.component.html',
})
export class NewCampingnComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public formFilters = this.formBuilder.group({
    type: [null],
    giro: [null]
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
    totalAmount: [null, Validators.required]
  });

  public catBusiness: entity.DataCatBusiness[] = [];
  public catTypes: entity.DataCatType[] = [];

  public fechaHoy = new Date();
  public toppings = new FormControl('');
  public selectCompanies = new FormControl('');
  
  public toppingList: string[] = ['Empresa A', 'Empresa B', 'Empresa C'];

  public url = document.location.href;

  private idData: string = '';
  private objEditData : any;

  constructor(
    private notificationService: OpenModalsService,
    private moduleServices: CatchmentService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getId()
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getCatalogs()
    }, 500);
  }

  getId() {
    this.activatedRoute.params.subscribe(({ id }: any) => {
      this.idData = id;
      // this.getDataById();

      if (this.url.includes('detalle')) {
        setTimeout(() => {
          // this.enableOrDisableInputs();
        });
      } 
    });
  }

  getDataById() {
    this.moduleServices.getDataId(this.idData).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: any) => {
        this.objEditData = response
        this.formData.patchValue({...this.objEditData})
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  getCatalogs() {
    this.moduleServices.getCatBusiness().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entity.DataCatBusiness[]) => {
        this.catBusiness = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatType().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entity.DataCatType[]) => {
        this.catTypes = data;
      },
      error: (error) => console.error(error)
    });
  }

  actionSave() {
    let objData : any = {
      ...this.formData.value,
    }

    if (this.idData) this.saveDataPatch(objData)
     else this.saveDataPost(objData)
  }

  saveDataPost(objData) {
    this.moduleServices.postData(objData).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: any) => {
        this.completionMessage()
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  saveDataPatch(objData) {
    this.moduleServices.patchData(objData).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: any) => {
        this.completionMessage(true)
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  completionMessage(edit = false) {
    this.notificationService
      .notificacion(
        'Éxito',
        `Registro ${edit ? 'editado' : 'guardado'}.`,
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
