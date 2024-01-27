import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalFastQuoteComponent } from '../../prospects/modal-fast-quote/modal-fast-quote.component';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrl: './new-client.component.scss'
})
export class NewClientComponent implements AfterViewInit, OnInit {

  public addContact = new FormControl(false)
  public contacts: any[] = []
  public valuesContacts: any[] = []

  public url = document.location.href;
  public modalTitle: string = '';
  public esClient : boolean = false;

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

  constructor(
    private _fuseConfirmationService: FuseConfirmationService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
  ) { }


  ngOnInit(): void {
   console.log(this.url);

    if (this.url.includes('cliente')) {
      this.addContact.setValue(true)
    }
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

  deleteContact(index:number) {
    this.valuesContacts.splice(index, 1)
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

  save() {
    this.notificationService
      .notificacion(
        'Éxito',
        'Registro guardado.',
        'save',
      )
      .afterClosed()
      .subscribe((_) => {
        if (this.url.includes('nuevo-cliente')) {
          this.fastQuote()
        } else {
          this.toBack()
        }
      });
  }

  toBack() {
    this.router.navigateByUrl(`/home/empresas/${
    this.url.includes('todos') ? 'todos' : this.url.includes('prospecto') ? 'prospectos' : 'clientes'}`)
  }
  
  toBackClient() {
    this.router.navigateByUrl(`/home/empresas/clientes`)
  }

  toAll() {
    this.router.navigateByUrl(`/home/empresas/todos`)
  }

}
