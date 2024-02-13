import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalFastQuoteComponent } from '../../prospects/modal-fast-quote/modal-fast-quote.component';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { CompaniesService } from '../../companies.service';
import { Subject, takeUntil } from 'rxjs';
import * as entity from '../../companies-interface';
import * as entityGeneral from '../../../../shared/interfaces/general-interface';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss'
})
export class NewClientComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public addContact = new FormControl(false)
  public contacts: any[] = []
  public valuesContacts: any[] = []

  public url = document.location.href;
  public modalTitle: string = '';
  public esClient: boolean = false;

  public formData = this.formBuilder.group({
    name: ['', Validators.required],
    email: [''],
    web: [''],
    country: ['', Validators.required],
    giro: ['', Validators.required],
    companySize: ['', Validators.required],
    phone: [''],
    rfc: [''],
    origin: [''],
    agent: [''],
    state: ['', Validators.required],
    adress: [''],
    companyType: ['', Validators.required],
  });

  public catCompaniesSizes: entityGeneral.DataCatCompanySize[] = [];
  public catCompaniesTypes: entityGeneral.DataCatCompanyType[] = [];
  public catCountries: entityGeneral.DataCatCountry[] = [];
  public catStates: entityGeneral.DataCatState[] = [];
  public catCities: entityGeneral.DataCatCity[] = [];
  public catBusiness: entityGeneral.DataCatBusiness[] = [];

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
    this.getId()
  }

  ngAfterViewInit(): void {
    this.addContact.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(resp => {
      console.log(resp);
    })

    setTimeout(() => {
      this.getCatalogs()
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
      nombreControl: new FormControl({ value: datos?.nombre || '', disabled: false }, Validators.required),
      correoControl: new FormControl({ value: datos?.correo || '', disabled: false }, Validators.required),
      telefonoControl: new FormControl({ value: datos?.correo || '', disabled: false }, Validators.required),
      cargoControl: new FormControl({ value: datos?.correo || '', disabled: false }, Validators.required),
      movilControl: new FormControl({ value: datos?.correo || '', disabled: false }, Validators.required),
      extensionControl: new FormControl({ value: datos?.correo || '', disabled: false }),
    };

    this.valuesContacts.push(instance);
  }

  getContactsValue() {
    const contactValues = (e: any) => {
      let obj = {
        nombre: e.nombreControl.value,
        correo: e.correoControl.value,
        telefono: e.telefonoControl.value,
        cargo: e.cargoControl.value,
        movil: e.movilControl.value,
        extension: e.extensionControl.value,
      }

      return obj
    };

    return this.valuesContacts.map(contactValues);
  }

  deleteContact(index: number) {
    this.valuesContacts.splice(index, 1)
  }

  getDataById() {
    this.moduleServices.getDataId('client', this.idData).pipe(takeUntil(this.onDestroy)).subscribe({
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
    let objData : any = {
      ...this.formData.value,
      conctas: this.getContactsValue()
    }

    if (this.idData) this.saveDataPatch(objData)
     else this.saveDataPost(objData)
  }

  saveDataPost(objData) {
    this.moduleServices.postData('client', objData).pipe(takeUntil(this.onDestroy)).subscribe({
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
    this.moduleServices.patchData('client', objData).pipe(takeUntil(this.onDestroy)).subscribe({
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
