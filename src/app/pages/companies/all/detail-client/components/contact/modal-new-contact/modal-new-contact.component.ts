import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { CompaniesService } from 'app/pages/companies/companies.service';
import * as entity from '../../../../../companies-interface';

@Component({
  selector: 'app-modal-new-contact',
  templateUrl: './modal-new-contact.component.html',
  styleUrls: []
})
export class ModalNewContactComponent implements OnInit {
  public addContact = new FormControl('')
  public contactos: any[] = []
  public valuesContacts: any[] = []

  public url = document.location.href;
  public modalTitle: string = '';
  public esClient : boolean = false;

  public objEditData:any;

  constructor(
    private formBuilder: FormBuilder,
    private moduleServices: CompaniesService,
    private dialog: MatDialog,
    private router: Router,
    private notificationService: OpenModalsService,

		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {}

  ngOnInit(): void {
    if (this.url.includes('cliente')) {
      this.modalTitle = 'Registrar nuevo cliente'
      this.esClient = true;
    }
     else this.modalTitle = 'Registrar nuevo prospecto'

    console.log(this.modalTitle);
  }

  ngAfterViewInit(): void {
    this.addContact.valueChanges.subscribe(resp => {
      console.log(resp);
    })

    this.addFormContact();
  }
 
  addFormContact(datos?: any) {
    const instance: any = {
      ...(datos && { id: datos.id }),
      fullNameControl: new FormControl({ value: datos?.name || '', disabled: datos?.name ? true : false }, Validators.required),
      emailControl: new FormControl({ value: datos?.email || '', disabled: false }, Validators.required),
      movilPhoneControl: new FormControl({ value: datos?.phoneMovil || '', disabled: false }, Validators.required),
      localPhoneControl: new FormControl({ value: datos?.landline || '', disabled: false }, Validators.required),
      positionControl: new FormControl({ value: datos?.position || '', disabled: false }, Validators.required),
      extensionControl: new FormControl({ value: datos?.extension || '', disabled: false }),
    };

    this.valuesContacts.push(instance);
  }

  getContactsValue() {
    const contactValues = (e: any) => {
      let obj = {
        full_name: e.fullNameControl.value,
        email: e.emailControl.value,
        local_phone: e.localPhoneControl.value,
        position: e.positionControl.value,
        movil_phone: e.movilPhoneControl.value,
        ext: e.extensionControl.value,
        company: this.data.info
      }

      return obj
    };

    return this.valuesContacts.map(contactValues);
  }

  deleteContact(index: number) {
    this.valuesContacts.splice(index, 1)
  }

  actionSave() {
    let contacts: entity.CompanyContacts[] = this.getContactsValue();

    console.log(this.getContactsValue());
    
    let objData: any = {
      ...contacts
    }
    
    console.log('OBJETO :', objData);
    // if (this.objEditData) this.saveDataPatch(objData);
    // else this.saveDataPost(objData);
  }

  saveDataPost(objData) {
    this.moduleServices.postDataContact(objData).subscribe({
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
    this.moduleServices.patchDataContact(this.objEditData.id, objData).subscribe({
      next: () => {
        this.completionMessage(true)
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  toBack() {
    this.router.navigateByUrl(`/home/empresas/prospectos`)
  }

  toAll() {
    this.router.navigateByUrl(`/home/empresas/todos`)
  }
  
  completionMessage(edit = false) {
    this.notificationService
      .notificacion(
        'Éxito',
        `Registro ${edit ? 'editado' : 'guardado'}.`,
        'save',
      )
      .afterClosed()
      .subscribe((_) => this.toBack());
  }

  get canSave() {
    const formValues = (e: any) => {
      if (
        !e?.fullNameControl.value ||
        !e?.emailControl.value ||
        !e?.movilPhoneControl.value ||
        !e?.localPhoneControl.value ||
        !e?.positionControl.value ||
        !e?.extensionControl.value
      ) {
        return false;
      }
  
      return true;
    };
  
    return this.valuesContacts.every(formValues);
  }

  closeModal() {
		this.dialogRef.close({
      close : true
    })
  }
}
