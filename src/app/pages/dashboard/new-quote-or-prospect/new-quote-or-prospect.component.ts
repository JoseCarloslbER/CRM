import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-quote-or-prospect',
  templateUrl: './new-quote-or-prospect.component.html',
  styleUrl: './new-quote-or-prospect.component.scss'
})
export class NewQuoteOrProspectComponent implements AfterViewInit {
 
  public addContact = new FormControl('')
  public contactos: any[] = []
  public valuesContacts: any[] = []
 
  public formulario = this.formBuilder.group({
    nombre: ['', Validators.required],
    correo: ['', Validators.required],
    telefono: ['', Validators.required],
    cargo: ['', Validators.required],
    movil: ['', Validators.required],
    extension: ['', Validators.required],
  });

  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }


  ngAfterViewInit(): void {
    this.addContact.valueChanges.subscribe(resp => {
      console.log(resp);
    })

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

  sacarContact() {
    let cont = 0;
    let contactInfo: any[] = [];

    for (const _ of this.valuesContacts) {
      contactInfo.push(this.getContactsValue()[cont])
      cont++;
    }
  }

  deleteContact(index:number) {
    this.valuesContacts.splice(index, 1)
  }

  save(){
    this.notificationService
      .notificacion(
        'Éxito',
        'Registro guardado.',
        'save',
      )
      .afterClosed()
      .subscribe((_) => {
        this.toBack()
      });
  }

  
  toBack(){
    this.router.navigateByUrl(`/home/conversion/detalle-cotizacion/1`)
  }
}
