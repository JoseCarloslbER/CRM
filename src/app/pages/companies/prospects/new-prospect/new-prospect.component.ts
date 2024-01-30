import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalFastQuoteComponent } from '../modal-fast-quote/modal-fast-quote.component';
import { Subject, takeUntil } from 'rxjs';
import { CompaniesService } from '../../companies.service';

@Component({
  selector: 'app-new-prospect',
  templateUrl: './new-prospect.component.html',
  styleUrl: './new-prospect.component.scss'
})
export class NewProspectComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public addContact = new FormControl('')
  public contacts: any[] = []
  public valuesContacts: any[] = []

  public url = document.location.href;
  public modalTitle: string = '';
  public esClient: boolean = false;

  public formData = this.formBuilder.group({
    name: [null, Validators.required],
    email: [null],
    web: [null],
    country: [null, Validators.required],
    giro: [null, Validators.required],
    companySize: [null, Validators.required],
    phone: [null],
    rfc: [null],
    origin: [null],
    agent: [null],
    state: [null, Validators.required],
    adress: [null],
    companyType: [null, Validators.required],
    comments: [null, Validators.required],
    file: [null, Validators.required],
  });

  private idData: string = ''

  private objEditData : any;

  constructor(
    private notificationService: OpenModalsService,
    private moduleServices: CompaniesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }: any) => {
      this.idData = id;
      // this.getDataById();

      if (this.url.includes('detalle')) {
        setTimeout(() => {
          this.habilitarODesabilitarInputs();
          this.addFormContact(true);
        });
      } else {
        this.addFormContact();
      }
    });
  }

  ngAfterViewInit(): void {
    this.addContact.valueChanges.subscribe(resp => {
      console.log(resp);
    })
  }

  addFormContact(bloquear?: boolean, datos?: any) {
    const instance: any = {
      ...(datos && { id: datos.id }),
      nombreControl: new FormControl({ value: datos?.nombre || '', disabled: bloquear == true }, Validators.required),
      correoControl: new FormControl({ value: datos?.correo || '', disabled: bloquear == true }, Validators.required),
      telefonoControl: new FormControl({ value: datos?.correo || '', disabled: bloquear == true }, Validators.required),
      cargoControl: new FormControl({ value: datos?.correo || '', disabled: bloquear == true }, Validators.required),
      movilControl: new FormControl({ value: datos?.correo || '', disabled: bloquear == true }, Validators.required),
      extensionControl: new FormControl({ value: datos?.correo || '', disabled: bloquear == true }),
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
    this.moduleServices.getDataId('prospect', this.idData).pipe(takeUntil(this.onDestroy)).subscribe({
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
    this.moduleServices.postData('prospect', objData).pipe(takeUntil(this.onDestroy)).subscribe({
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
    this.moduleServices.patchData('prospect', objData).pipe(takeUntil(this.onDestroy)).subscribe({
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
    this.router.navigateByUrl(`/home/empresas/prospectos`)
  }

  toAll() {
    this.router.navigateByUrl(`/home/empresas/todos`)
  }

  habilitarODesabilitarInputs(accion = false) {
    const key = accion ? 'enable' : 'disable';
    this.formData.get('name')?.[key]();
    this.formData.get('email')?.[key]();
    this.formData.get('web')?.[key]();
    this.formData.get('country')?.[key]();
    this.formData.get('giro')?.[key]();
    this.formData.get('companySize')?.[key]();
    this.formData.get('phone')?.[key]();
    this.formData.get('rfc')?.[key]();
    this.formData.get('origin')?.[key]();
    this.formData.get('adress')?.[key]();
    this.formData.get('agent')?.[key]();
    this.formData.get('state')?.[key]();
    this.formData.get('adress')?.[key]();
    this.formData.get('companyType')?.[key]();
    this.formData.get('comments')?.[key]();
    this.formData.get('file')?.[key]();
  }

  get canSave(): boolean {
    return !(this.formData.valid || this.contacts.length);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}