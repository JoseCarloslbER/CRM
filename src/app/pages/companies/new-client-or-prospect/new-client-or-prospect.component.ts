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
  public movilPhoneContact = new FormControl('555555')
  public nameContact = new FormControl('TEST contact')
  public contacts: any[] = []
  public valuesContacts: any[] = []

  public url = document.location.href;
  public modalTitle: string = '';
  public esClient: boolean = false;

  public formData = this.formBuilder.group({
    company_name: ['TEST', Validators.required],
    platform: ['d521a2a3-5f3c-4bb1-a732-fe6af76b8fb7'],
    phone_number: ['6689898989'],
    email: ['', Validators.required],
    tax_id_number: ['', Validators.required],
    state: ['', Validators.required],
    owner_user: ['', Validators.required],
    country: [''],
    business: [''],
    city: [''],
    address: [''],
    company_type: [''],
    company_size: [''],
    web_page: ['https://fonts.google.com/icons'],
    comments: ['TEST'],
    company_phase: ['ec43fa4e-1ade-46ea-9841-1692074ce8cd'],
  });

  // COMPANY_PHASE_CLIENTE = "d1203730-3ac8-4f06-b095-3ec56ef3b54d"
  // COMPANY_PHASE_LEAD = "20a3bf77-6669-40ec-b214-e31122d7eb7a"

  public catCompaniesSizes: entityGeneral.DataCatCompanySize[] = [];
  public catCompaniesTypes: entityGeneral.DataCatCompanyType[] = [];
  public catCountries: entityGeneral.DataCatCountry[] = [];
  public catStates: entityGeneral.DataCatState[] = [];
  public catCities: entityGeneral.DataCatCity[] = [];
  public catBusiness: entityGeneral.DataCatBusiness[] = [];
  public catOrigin: TableDataOrigin[] = [];

  public title: string = 'cliente';

  private idData: string = ''
  private objEditData: any;


  constructor(
    private notificationService: OpenModalsService,
    private moduleServices: CompaniesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
  ) { }


  ngOnInit(): void {
    // this.getId()
    this.verifyType()
    setTimeout(() => {
    }, 500);
  }

  verifyType() {
    if (this.url.includes('prospecto')) {
      this.title = 'prospecto';
      this.addContact.patchValue(false)
      this.getCatalogsInitial()
    } else {
      this.getCatalogsInitial()
      this.getCatalogs()
    }
  }


  ngAfterViewInit(): void {
    this.addContact.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(resp => {
      console.log(resp);
    })

    setTimeout(() => {
      // this.getCatalogs()
    }, 500);
  }

  getId() {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe(({ id }: any) => {
      this.idData = id;
      // this.getDataById();

      if (this.url.includes('detalle')) {
        setTimeout(() => {
          this.enableOrDisableInputs();
          this.addFormContact(true);
        });
      } else {
        this.addFormContact();
      }
    });
  }
  
  getCatalogsInitial() {
    this.moduleServices.getCatOrigin().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: TableDataOrigin[]) => {
        this.catOrigin = data;
      },
      error: (error) => console.error(error)
    });
  }

  getCatalogs() {
    this.moduleServices.getCatalogCompanySize().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatCompanySize[]) => {
        this.catCompaniesSizes = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatalogCompanyType().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatCompanyType[]) => {
        this.catCompaniesTypes = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatalogCountry().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatCountry[]) => {
        this.catCountries = data;
      },
      error: (error) => console.error(error)
    });
 
    this.moduleServices.getCatalogState().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatState[]) => {
        this.catStates = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatalogCity().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatCity[]) => {
        this.catCities = data;
      },
      error: (error) => console.error(error)
    });
 
    this.moduleServices.getCatalogBusiness().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatBusiness[]) => {
        this.catBusiness = data;
      },
      error: (error) => console.error(error)
    });
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
        movil_phone: e.moPhonevilControl.value,
        ext: e.extControl.value,
      }

      return obj
    };

    return this.valuesContacts.map(contactValues);
  }

  deleteContact(index: number) {
    this.valuesContacts.splice(index, 1)
  }

  getDataById() {
    this.moduleServices.getDataId(this.idData).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: any) => {
        this.objEditData = response
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  formPatchData() {
    this.formData.patchValue({...this.objEditData})
    this.addFormContact(this.objEditData.conctacts)
  }

  actionSave() {
    let contacts:entity.CompanyContacts[] = this.getContactsValue();

    let objData : any = {
      ...this.formData.value,
      // platform : 
    }

    if (!contacts.length) {
        console.log('Agregar objeto :');
        contacts.push({
          full_name : this.nameContact.value,
          movil_phone : this.movilPhoneContact.value,
        });

        objData.company_contacts = contacts;
    }

    console.log('OBJETO :', objData);
    

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
        this.router.navigateByUrl(`/home/conversion/nueva-cotizacion`)

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

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
