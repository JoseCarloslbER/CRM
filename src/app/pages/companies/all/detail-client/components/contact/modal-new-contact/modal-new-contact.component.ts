import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OpenModalsService } from 'app/shared/services/openModals.service';

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

  public formulario = this.formBuilder.group({
    nombre: ['', Validators.required],
    correo: ['', Validators.required],
    telefono: ['', Validators.required],
    cargo: ['', Validators.required],
    movil: ['', Validators.required],
    extension: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private notificationService: OpenModalsService,

		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {
	
	}

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
  fastQuote() {
    // this.dialog.open(ModalFastQuoteComponent, {
    //   data: {},
    //   disableClose: true,
    //   width: '400px',
    //   maxHeight: '400px',
    //   panelClass: 'custom-dialog',
    // })
    //   .afterClosed()
    //   .subscribe(({ close }) => {
    //     console.log(close);
    //     this.router.navigateByUrl(`/home/conversion/nueva-cotizacion`)

    //   });
  }

  save() {
    this.notificationService
      .notificacion(
        'Éxito',
        'Registro guardado.',
        'save',
      )
      .afterClosed()
      .subscribe((_) => {
        this.closeModal()
      });
  }



  toBack() {
    this.router.navigateByUrl(`/home/empresas/prospectos`)
  }

  toAll() {
    this.router.navigateByUrl(`/home/empresas/todos`)
  }

  closeModal() {
		this.dialogRef.close({
      close : true
    })
  }
}
