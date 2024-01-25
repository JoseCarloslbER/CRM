import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-quote-or-client',
  templateUrl: './new-quote-or-client.component.html',
  styleUrl: './new-quote-or-client.component.scss'
})
export class NewQuoteOrClientComponent {

  public productFormValues : any[] = [];
  public optionFormValues : any[] = [];

  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }


  ngAfterViewInit(): void {

    this.addFormOption();
    this.addFormProduct();
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

  
  addFormProduct(datos?: any) {
    console.log(this.productFormValues);
    const instance: any = {
      ...(datos && { id: datos.id }),
      placesControl: new FormControl({ value: datos?.places || '', disabled: false }),
      productControl: new FormControl({ value: datos?.product || '', disabled: false }),
      unitPriControl: new FormControl({ value: datos?.unitPri || '', disabled: false }),
      totalPricePriControl: new FormControl({ value: datos?.totalPricePri || '', disabled: false }),
    };

    this.productFormValues.push(instance);
    console.log(this.productFormValues);
    
  }

  getProductsValues() {
    const formValues = (e: any) => {
      let obj = {
        places: e.placesControl.value,
        product: e.productControl.value,
        unitPrice: e.unitPriceControl.value,
        totalPrice: e.totalPriceControl.value,
      }

      return obj
    };

    return this.productFormValues.map(formValues);
  }

  deleteProductValue(index:number) {
    this.productFormValues.splice(index, 1)
  }

  addFormOption(datos?: any) {
    const instance: any = {
      ...(datos && { id: datos?.id }),
      subtotalControl: new FormControl({ value: datos?.subtotal || '', disabled: false }),
      discountControl: new FormControl({ value: datos?.discount || '', disabled: false }),
      totalControl: new FormControl({ value: datos?.total || '', disabled: false }),
      dateControl: new FormControl({ value: datos?.date || '', disabled: false }),
      timeControl: new FormControl({ value: datos?.time || '', disabled: false })
    };

    this.optionFormValues.push(instance);
  }

  getOptionsValues() {
    const formValues = (e: any) => {
      let obj = {
        subtotal: e.subtotalControl.value,
        discount: e.discountControl.value,
        total: e.totalControl.value,
        date: e.dateControl.value,
        time: e.timeControl.value,
      }

      return obj
    };

    return this.optionFormValues.map(formValues);
  }

  deleteOptionValue(index:number) {
    this.optionFormValues.splice(index, 1)
  }
  
  toBack(){
    this.router.navigateByUrl(`/home/conversion/detalle-cotizacion/1`)
  }
}
