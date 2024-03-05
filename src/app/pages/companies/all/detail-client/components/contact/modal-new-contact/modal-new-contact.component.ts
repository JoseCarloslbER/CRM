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

  public formData = this.formBuilder.group({
    full_name: ['', Validators.required],
    email: ['', Validators.pattern(/^\S+@\S+\.\S+$/)],
    local_phone: ['', Validators.required],
    position: ['', Validators.required],
    movil_phone: ['', Validators.required],
    ext: ['', Validators.required],
  });

  public objEditData:any;

  constructor(
    private formBuilder: FormBuilder,
    private moduleServices: CompaniesService,
    private router: Router,
    private notificationService: OpenModalsService,

		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {}

  ngOnInit(): void {
    if (this.url.includes('cliente')) {
      this.modalTitle = 'Registrar nuevo cliente'
      this.esClient = true;
    } else this.modalTitle = 'Registrar nuevo prospecto'
  }

  ngAfterViewInit(): void {
    this.addContact.valueChanges.subscribe(resp => {
      console.log(resp);
    })
  }
 
  actionSave() {
    let objData: any = {
      ...this.formData.value,
      company: this.data.info
    }
    
    console.log('OBJETO :', objData);
    if (this.objEditData) this.saveDataPatch(objData);
    else this.saveDataPost(objData);
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
      .subscribe((_) => {
        this.closeModal()
      });
  }

  configInput(event: Event, control:string): void {
		const inputElement = event.target as HTMLInputElement;
		const inputValue = inputElement.value;
		const sanitizedValue = inputValue.replace(/\D/g, '');

    const formControl = this.formData.get(control);
    if (formControl) formControl.setValue(sanitizedValue, { emitEvent: false });
	}

  closeModal() {
		this.dialogRef.close({
      close : true
    })
  }
}
