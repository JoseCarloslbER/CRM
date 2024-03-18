import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject, takeUntil } from 'rxjs';
import { CatchmentService } from '../../catchment.service';
import * as entity from '../../catchment-interface';
import * as entityGeneral from '../../../../shared/interfaces/general-interface';
import moment from 'moment';
import { CatalogsService } from 'app/shared/services/catalogs.service';

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
    campaign_name: [null, Validators.required],
    amount_invested: ['', Validators.required],
    campaign_type: [null, Validators.required],
    owner_user: [null, Validators.required],
    users: [null, Validators.required],
    start_date: [null, Validators.required],
    end_date: [null, Validators.required],
    product_category: [null, Validators.required],
    description: [null, Validators.required],
    goal_total_companies: [null],
    goal_total_responses: [null],
    goal_number_quotes: [null],
    goal_number_sales: [null],
    goal_amount: ['']
  });

  public formCompanies = this.formBuilder.group({
    companies: [[], Validators.required],
    radioOption: ['']
  });

  public catBusiness: entityGeneral.DataCatBusiness[] = [];
  public catTypes: entityGeneral.DataCatType[] = [];
  public catCompanyType: entityGeneral.DataCatCompanyType[] = [];
  public catalogAgents: entityGeneral.DataCatAgents[] = [];
  public catalogProductCategories: entityGeneral.DataCatProductCategory[] = [];
  public catalogUsers: entityGeneral.DataCatProductCategory[] = [];
  public catalogCompanies: entityGeneral.DataCatCompany[] = [];

  public fechaHoy = new Date();
  public toppings = new FormControl('');
  public selectCompanies = new FormControl('');

  public url = document.location.href;

  public companiesSelected: any[] = [];

  private idData: string = '';
  private objEditData: any;


  constructor(
    private notificationService: OpenModalsService,
    private moduleServices: CatchmentService,
    private catalogsServices: CatalogsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
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
      if (id) {
        this.idData = id;
        this.getDataById();
      }
    });
  }

  getDataById() {
    this.moduleServices.getDataId(this.idData).subscribe({
      next: (response: any) => {
        this.objEditData = response;
        this.formData.patchValue({ ...this.objEditData });
        this.formCompanies.patchValue({ ...this.objEditData?.formCompanies });
        this.companiesSelected = this.objEditData.companiesSelected;
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  getCatalogs() {
    this.catalogsServices.getCatBusiness().subscribe({
      next: (data: entityGeneral.DataCatBusiness[]) => {
        this.catBusiness = data;;
      },
      error: (error) => console.error(error)
    });

    
    this.catalogsServices.getCatCompanyType().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatCompanyType[]) => {
        this.catCompanyType = data;;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCapaignType().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatType[]) => {
        this.catTypes = data;;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatAgents().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catalogAgents = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatProductCategory().pipe(takeUntil(this.onDestroy)).subscribe({
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

    this.catalogsServices.getCatCompany(filters).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatCompany[]) => {
        this.catalogCompanies = data;
      },
      error: (error) => console.error(error)
    });
  }

  actionSave() {
    let objData: any = {
      ...this.formData.value,
      companies: this.companiesSelected.map(data => data.company_id)
    }

    objData.end_date = moment(this.formData.get('end_date').value).format('YYYY-MM-DD')
    objData.start_date = moment(this.formData.get('start_date').value).format('YYYY-MM-DD')

    if (this.idData && this.url.includes('editar')) this.saveDataPatch(objData)
    else this.saveDataPost(objData)
  }

  saveDataPost(objData) {
    this.moduleServices.postData(objData).pipe(takeUntil(this.onDestroy)).subscribe({
      next: () => {
        this.completionMessage()
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  saveDataPatch(objData) {
    this.moduleServices.patchData(this.objEditData.id, objData).pipe(takeUntil(this.onDestroy)).subscribe({
      next: () => {
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

  toBack() {
    this.router.navigateByUrl(`/home/captacion/campanias`)
  }

  get canSave() {
    let action = true
    if ((
      !this.objEditData && this.formCompanies.get('radioOption')?.value && 
      this.formCompanies.get('companies')?.value) &&
      this.formData.valid
      ||
      this.objEditData && 
      this.formCompanies.get('companies')?.value && this.formData.valid)
    {
      action = false
    }

    return action
  }

  configInput(event: Event, control:string): void {
		const inputElement = event.target as HTMLInputElement;
		const inputValue = inputElement.value;
		const sanitizedValue = inputValue.replace(/\D/g, '');

    const formControl = this.formData.get(control);
    if (formControl) formControl.setValue(sanitizedValue, { emitEvent: false });
	}

  cleanData() {
    return {
      ...this.formData.value,
      amount_invested : parseFloat(this.formData.get('amount_invested')?.value.replace(/[^0-9.-]+/g,"")),
      goal_amount : parseFloat(this.formData.get('goal_amount')?.value.replace(/[^0-9.-]+/g,"")),
      end_date : moment(this.formData.get('end_date').value).format('YYYY-MM-DD'),
      start_date : moment(this.formData.get('start_date').value).format('YYYY-MM-DD')
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
