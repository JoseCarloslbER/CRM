import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import * as entity from '../companies-interface';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { CompaniesService } from '../companies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalFastQuoteComponent } from '../prospects/modal-fast-quote/modal-fast-quote.component';
import { TableDataOrigin } from 'app/pages/config/config-interface';

@Component({
  selector: 'app-new-client-or-prospect',
  templateUrl: './new-client-or-prospect.component.html',
  styleUrl: './new-client-or-prospect.component.scss'
})
export class NewClientOrProspectComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public addContact = new FormControl(true)
  public movilPhoneContact = new FormControl('', Validators.required)
  public nameContact = new FormControl('', Validators.required)
  public contacts: any[] = []
  public valuesContacts: any[] = []

  public url = document.location.href;
  public modalTitle: string = '';
  public esClient: boolean = false;

  public formData = this.formBuilder.group({
    company_name: ['', Validators.required],
    platform: ['', Validators.required],
    phone_number: [''],
    email: [''],
    tax_id_number: [''],
    state: [''],
    owner_user: [''],
    country: [''],
    business: [''],
    city: [''],
    address: [''],
    company_type: [''],
    company_size: [''],
    web_page: [''],
    comments: ['']
  });

  public catCompaniesSizes: entityGeneral.DataCatCompanySize[] = [];
  public catCompaniesTypes: entityGeneral.DataCatCompanyType[] = [];
  public catCountries: entityGeneral.DataCatCountry[] = [];
  public catStates: entityGeneral.DataCatState[] = [];
  public catCities: entityGeneral.DataCatCity[] = [];
  public catBusiness: entityGeneral.DataCatBusiness[] = [];
  public catAgents: entityGeneral.DataCatAgents[] = [];
  public catOrigin: TableDataOrigin[] = [];

  public title: string = 'cliente';

  public objEditData: any;

  constructor(
    private notificationService: OpenModalsService,
    private moduleServices: CompaniesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.verifyType()
  }

  verifyType() {
    this.getId()

    if (this.url.includes('prospecto')) {
      this.title = 'prospecto';
      this.addContact.patchValue(false)
      this.getCatalogsInitial();
    } else {
      this.getCatalogs();
    }
  }

  ngAfterViewInit(): void {
    this.addContact.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(resp => {
      if (resp) {
        this.asignValidators(true);
        this.getCatalogs();
      
      } else this.asignValidators(false);
    })
  }

  getId() {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe((params:any) => {
      if (params.id) this.getDataById(params.id);
    });
  }

  getCatalogsInitial() {
    this.moduleServices.getCatOrigin().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: TableDataOrigin[]) => {
        this.catOrigin = data;
        console.log(this.catOrigin);
      },
      error: (error) => console.error(error)
    });
  }

  getDataById(id:string) {
    this.moduleServices.getDataId(id).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: any) => {
        this.isCompleted(response)
        this.objEditData = response;
        this.formData.patchValue({ ...this.objEditData });
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  getCatalogs() {
    this.getCatalogsInitial()

    this.moduleServices.getCatAgents().subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catAgents = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatalogCompanySize().subscribe({
      next: (data: entityGeneral.DataCatCompanySize[]) => {
        this.catCompaniesSizes = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatalogCompanyType().subscribe({
      next: (data: entityGeneral.DataCatCompanyType[]) => {
        this.catCompaniesTypes = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatalogCountry().subscribe({
      next: (data: entityGeneral.DataCatCountry[]) => {
        this.catCountries = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatalogState().subscribe({
      next: (data: entityGeneral.DataCatState[]) => {
        this.catStates = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatalogCity().subscribe({
      next: (data: entityGeneral.DataCatCity[]) => {
        this.catCities = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatalogBusiness().subscribe({
      next: (data: entityGeneral.DataCatBusiness[]) => {
        this.catBusiness = data;
      },
      error: (error) => console.error(error)
    });
  }

  formPatchData() {
    this.formData.patchValue({ ...this.objEditData })
    this.addFormContact(this.objEditData.conctacts)
  }

  actionSave() {
    let contacts: entity.CompanyContacts[] = [...this.getContactsValue()];

    let objData: any = {
      ...this.formData.value
    }

    if ((!contacts.length && !this.addContact.value)) {
      contacts.push({
        full_name: this.nameContact.value,
        movil_phone: this.movilPhoneContact.value,
      });
      objData.company_contacts = contacts;
    }

    if (contacts.length) objData.company_contacts = contacts;

    if (this.url.includes('prospecto')) objData.company_phase = 'ec43fa4e-1ade-46ea-9841-1692074ce8cd';
    else objData.company_phase = 'd1203730-3ac8-4f06-b095-3ec56ef3b54d';

    console.log('OBJETO :', objData);

    if (this.objEditData) this.saveDataPatch(objData);
    else this.saveDataPost(objData);
  }

  saveDataPost(objData) {
    this.moduleServices.postData(objData).subscribe({
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
    this.moduleServices.patchData(this.objEditData.id, objData).subscribe({
      next: () => {
        this.completionMessage(true)
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  addFormContact(datos?: any) {
    const instance: any = {
      ...(datos && { id: datos.id }),
      fullNameControl: new FormControl({ value: datos?.nombre || '', disabled: false }, Validators.required),
      emailControl: new FormControl({ value: datos?.correo || '', disabled: false }, Validators.required),
      localPhone: new FormControl({ value: datos?.correo || '', disabled: false }, Validators.required),
      positionControl: new FormControl({ value: datos?.correo || '', disabled: false }, Validators.required),
      movilPhoneControl: new FormControl({ value: datos?.correo || '', disabled: false }, Validators.required),
      extControl: new FormControl({ value: datos?.correo || '', disabled: false }),
    };

    this.valuesContacts.push(instance);
  }

  getContactsValue() {
    const contactValues = (e: any) => {
      let obj = {
        full_name: e.fullNameControl.value,
        email: e.emailControl.value,
        local_phone: e.localPhone.value,
        position: e.positionControl.value,
        movil_phone: e.movilPhoneControl.value,
        ext: e.extControl.value,
      }

      return obj
    };

    return this.valuesContacts.map(contactValues);
  }

  deleteContact(index: number) {
    this.valuesContacts.splice(index, 1)
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
        if (this.url.includes('nuevo')) {
          this.fastQuote()
        } else {
          this.toBack()
        }
      });
  }

  fastQuote() {
    this.dialog.open(ModalFastQuoteComponent, {
      data: {},
      disableClose: true,
      width: '400px',
      maxHeight: '400px',
      panelClass: 'custom-dialog',
    })
      .afterClosed()
      .subscribe(({ close }) => {
        console.log(close);
        if (close) this.router.navigateByUrl(`/home/conversion/nueva-cotizacion`)
        else this.router.navigateByUrl(`/home/empresas/${ this.url.includes('prospecto') ? 'prospectos' : 'clientes' }`)
      });
  }

  toBack() {
    this.router.navigateByUrl(`/home/empresas/${this.url.includes('todos') ? 'todos' : this.url.includes('prospecto') ? 'prospectos' : 'clientes'}`)
  }

  toBackClient() {
    this.router.navigateByUrl(`/home/empresas/clientes`)
  }

  toAll() {
    this.router.navigateByUrl(`/home/empresas/todos`)
  }

  enableOrDisableInputs(accion = false) {
    const key = accion ? 'enable' : 'disable';
    this.formData.get('name')?.[key]();
  }

  get canSave(): boolean {
    return !(this.formData.valid || this.contacts.length);
  }

  isCompleted(data:entity.GetDataCompanyMapper){
    if (data.country || data.company_type || data.city ) this.addContact.patchValue(true);
  }

  asignValidators(accion = false) {
    if (accion) {
      this.formData.get('country')?.setValidators(Validators.required);
      this.formData.get('state')?.setValidators(Validators.required);
      this.formData.get('city')?.setValidators(Validators.required);
      this.formData.get('company_type')?.setValidators(Validators.required);
      this.formData.get('company_size')?.setValidators(Validators.required);
      this.formData.get('business')?.setValidators(Validators.required);
    } else {
      this.formData.get('country')?.clearValidators();
      this.formData.get('state')?.clearValidators();
      this.formData.get('city')?.clearValidators();
      this.formData.get('company_type')?.clearValidators();
      this.formData.get('company_size')?.clearValidators();
      this.formData.get('business')?.clearValidators();
    }
	}


  get form () {
      console.log(this.formData);
      
    return ' '
  }
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
