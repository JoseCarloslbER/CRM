import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl,  Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject, takeUntil } from 'rxjs';
import { CatchmentService } from '../../catchment.service';
import * as entity from '../../catchment-interface';
import * as entityGeneral from '../../../../shared/interfaces/general-interface';
import moment from 'moment';

@Component({
  selector: 'app-new-campingn',
  templateUrl: './new-campingn.component.html',
})
export class NewCampingnComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public formFilters = this.formBuilder.group({
    type: [''],
    business: ['']
  });

  public formData = this.formBuilder.group({
    campaign_code: [null],
    campaign_name: [null],
    amount_invested: [null],
    campaign_type: [null],
    owner_user: [null, Validators.required],
    users: [null, Validators.required],
    start_date: [null, Validators.required],
    end_date: [null, Validators.required],
    product_category: [null, Validators.required],
    description: [null, Validators.required],
    goal_total_companies: [null, Validators.required],
    goal_total_responses: [null, Validators.required],
    goal_number_quotes: [null, Validators.required],
    goal_number_sales: [null, Validators.required],
    goal_amount: [null, Validators.required]
  });

  public catBusiness: entityGeneral.DataCatBusiness[] = [];
  public catTypes: entityGeneral.DataCatType[] = [];
  public catalogAgents: entityGeneral.DataCatAgents[] = [];
  public catalogProductCategories: entityGeneral.DataCatProductCategory[] = [];
  public catalogUsers: entityGeneral.DataCatProductCategory[] = [];
  public catalogCompanies: entityGeneral.DataCatCompany[] = [];

  public fechaHoy = new Date();
  public toppings = new FormControl('');
  public selectCompanies = new FormControl('');
  
  public url = document.location.href;

  public formCompanies = this.formBuilder.group({
    companies: [[]], 
    radioOption: ['']
  });
  public companiesSelected: any[] = [];

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
    this.getId();
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
      next: (data: entityGeneral.DataCatBusiness[]) => {
        this.catBusiness = data;;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatType().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatType[]) => {
        this.catTypes = data;;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatAgents().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catalogAgents = data;
      },
      error: (error) => console.error(error)
    });
 
    this.moduleServices.getCatProductCategory().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatProductCategory[]) => {
        this.catalogProductCategories = data;
      },
      error: (error) => console.error(error)
    });

    this.searchCompanies()

  }

  searchCompanies() {
    let filters = '';
    
    if (this.formFilters.get('type')?.value) filters += `campaign_type_id=${this.formFilters.get('type').value}&`;
    if (this.formFilters.get('business')?.value) filters += `business_id=${this.formFilters.get('business').value}&`;

    this.moduleServices.getCatCompany(filters).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatCompany[]) => {
        this.catalogCompanies = data;
        console.log(this.catalogCompanies);
        
      },
      error: (error) => console.error(error)
    });
  }

  actionSave() {
    let objData : any = {
      ...this.formData.value,
      companies : this.companiesSelected.map(data => data.company_id)
    }

    objData.end_date = moment(this.formData.get('end_date').value).format('YYYY-MM-DD')
    objData.start_date = moment(this.formData.get('start_date').value).format('YYYY-MM-DD')

    console.log('OBJETO A GUARDAR: ', objData);
    
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

  onRadioChange(option: string) {
    this.formCompanies.patchValue({ radioOption: option });
    this.filterRegistros();
  }

  filterRegistros() {
    const selectedCompanies = this.formCompanies?.value?.companies || [];
    const radioOption = this.formCompanies.value.radioOption;

    if (radioOption === 'excepto') {
      this.companiesSelected = this.catalogCompanies.filter(
        (cat) => !selectedCompanies.includes(cat.company_id)
      );
    } else if (radioOption === 'solo') {
      this.companiesSelected = this.catalogCompanies.filter((cat) =>
        selectedCompanies.includes(cat.company_id)
      );
    } 
    console.log(this.companiesSelected);
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
