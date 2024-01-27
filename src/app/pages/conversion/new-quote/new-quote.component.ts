import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalNewProductComponent } from 'app/pages/admin/main-products/products/modal-new-product/modal-new-product.component';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrl: './new-quote.component.scss'
})
export class NewQuoteComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public addContact = new FormControl('')

  public productFormValues : any[] = [];
  public optionFormValues : any[] = [];
  
  public url = document.location.href;

  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.addContact.valueChanges.subscribe(resp => {
      console.log(resp);
    })

    this.addFormOption();
    this.addFormProduct();
  }

  addFormProduct(datos?: any) {
    console.log(this.productFormValues);
    const instance: any = {
      ...(datos && { id: datos.id }),
      placesControl: new FormControl({ value: datos?.places || '', disabled: false }),
      productControl: new FormControl({ value: datos?.product || '', disabled: false }),
      unitPriControl: new FormControl({ value: datos?.unitPri || '', disabled: false }),
      totalPricePriControl: new FormControl({ value: datos?.totalPricePri || '', disabled: false }),
      priceTypeControl: new FormControl({ value: datos?.time || '', disabled: false })
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
        priceType: e.priceTypeControl.value,
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

  newDataProduct() {
    this.dialog.open(ModalNewProductComponent, {
      data: null,
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    });
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
       this.toDetailQuote()
      });
  }

  toBack(){
    this.router.navigateByUrl(`/home/conversion/cotizaciones`)
  }
  
  toDetailQuote(){
    this.router.navigateByUrl(`/home/conversion/detalle-cotizacion/1`)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
