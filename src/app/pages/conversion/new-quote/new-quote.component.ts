import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalNewProductComponent } from 'app/pages/admin/main-products/products/modal-new-product/modal-new-product.component';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Observable, Subject, map, startWith, takeUntil } from 'rxjs';
import { ConversionService } from '../conversion.service';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import moment from 'moment';
import * as entity from '../conversion-interface';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrl: './new-quote.component.scss'
})
export class NewQuoteComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();
  public filteredOptions: Observable<any[]>;

  public addContact = new FormControl('')

  public productFormValues : any[] = [];
  public optionFormValues : any[] = [];
  
  public url = document.location.href;

  public company = new FormControl(null);


  public formData = this.formBuilder.group({
    contact: [''],
    user: ['b77cc580-1841-4614-ab78-a0c0d8159c5f'],
    campaign: ['f9523bda-f248-4e3f-9574-e1b154cc84c2'],
    payment_method: ['71caafeb-eb60-496b-98b7-4ee16a79c3f0'],
    tax_include: [false],
    // contact: [''],
    // user: [''],
    // campaign: [''],
    // payment_method: [''],
    // tax_include: [false],
  });

  public catCompanies: any[] = [];
  public catAgents: entityGeneral.DataCatAgents[] = [];
  public catCampaing: entityGeneral.DataCatCampaing[] = [];
  public catWayToPay: entityGeneral.DataCatWayToPay[] = [];
  public catProducts: entityGeneral.DataCatProducts[] = [];
  public catContacts: entityGeneral.DataCatContact[] = [];

  public objEditData: any;

  public companySelected : string = '';
  public idData : string = '';

  constructor(
    private moduleServices: ConversionService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addFormOption();
    // this.addFormProduct();

    setTimeout(() => {
      this.getCatalogs() 
    }, 500);

    this.filteredOptions = this.company.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngAfterViewInit(): void {
    this.company.valueChanges.subscribe(resp => {
      console.log(resp);
      if (this.companySelected) {
        let filter = `company_id=${this.companySelected}`;
        this.getCatalogContact(filter)
      }
    });
  }
  
  assignInformation() {
    // if (this.data?.info) {
    //   this.idData = this.data?.info?.id || this.data?.info?.activity_id;
    //   this.getDataById() 
    // } 
  }

  getDataById() {
    // this.moduleServices.getDataId(this.idData).subscribe({
    //   next: (response: entityManager.GetDataActivitiesMapper) => {
    //     this.objEditData = response;
    //     this.formData.patchValue(this.objEditData);
    //     this.company.patchValue(this.objEditData.companyName)
    //   },
    //   error: (error) => {
    //     this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
    //     console.error(error)
    //   }
    // })
  }

  getCatalogs() {
    this.moduleServices.getCatCompany().subscribe({
      next: (data: entityGeneral.DataCatCompany[]) => {
        this.catCompanies = data;
      },
      error: (error) => console.error(error)
    });
 
    this.moduleServices.getCatAgents().subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catAgents = data;
      },
      error: (error) => console.error(error)
    });
 
    this.moduleServices.getCatCampaing().subscribe({
      next: (data: entityGeneral.DataCatCampaing[]) => {
        this.catCampaing = data;
      },
      error: (error) => console.error(error)
    });
    
    this.moduleServices.getCatDataWayToPay().subscribe({
      next: (data: entityGeneral.DataCatWayToPay[]) => {
        this.catWayToPay = data;
      },
      error: (error) => console.error(error)
    })
  
    this.moduleServices.getCatProducts().subscribe({
      next: (data: entityGeneral.DataCatProducts[]) => {
        this.catProducts = data;
        console.log(data);
      },
      error: (error) => console.error(error)
    })
  }

  getCatalogContact(filter?:string) {
    console.log(filter);
    
    this.moduleServices.getCatDataContact(filter).subscribe({
      next: (data: entityGeneral.DataCatContact[]) => {
        this.catContacts = data;
      },
      error: (error) => console.error(error)
    })
  }

  actionSave() {
    let options: any[] = [...this.getOptionsValues()];
    console.log('options', options);

    let objData: any = {
      ...this.formData.value
    }

    objData.quote_options = options

    console.log('OBJETO :', objData);

    // if (this.idData) this.saveDataPatch(objData)
    // else this.saveDataPost(objData)
  }

  saveDataPost(objData) {
    this.moduleServices.postData(objData).pipe(takeUntil(this.onDestroy)).subscribe({
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
    this.moduleServices.patchData(this.objEditData.id, objData).pipe(takeUntil(this.onDestroy)).subscribe({
      next: () => {
        this.completionMessage(true)
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  addFormProduct(datos?: any) {
    const instance: any = {
      ...(datos && { id: datos.id }),
      placesControl: new FormControl({ value: datos?.places || '', disabled: false }),
      productControl: new FormControl({ value: datos?.product || '', disabled: false }),
      unitPriceControl: new FormControl({ value: datos?.unitPri || '', disabled: false }),
      totalPriceControl: new FormControl({ value: datos?.totalPricePri || '', disabled: false }),
    };

    return [instance]
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
      timeControl: new FormControl({ value: datos?.time || '', disabled: false }),
      product : this.addFormProduct()
    };

    this.optionFormValues.push(instance);
  }

  getOptionsValues() {
    const formValues = (e: any) => {
      const formattedDate = moment(e.dateControl.value).format('YYYY-MM-DD');
      const formattedTime = moment(e.timeControl.value, 'HH:mm').format('HH:mm');
      const combinedDateTime = moment(`${formattedDate}T${formattedTime}:00.000Z`).toISOString();

      const productValues = e.product.map((productControl: any) => {
        return {
          places: productControl.placesControl.value,
          product: productControl.productControl.value,
          unitPrice: productControl.unitPriceControl.value,
          totalPrice: productControl.totalPriceControl.value,
        };
      });
      
      let obj = {
        subtotal: e.subtotalControl.value,
        discount: e.discountControl.value,
        total: e.totalControl.value,
        deadline: combinedDateTime,
        option_products : productValues
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

  toBack(){
    this.router.navigateByUrl(`/home/conversion/cotizaciones`)
  }
  
  toDetailQuote(){
    this.router.navigateByUrl(`/home/conversion/detalle-cotizacion/1`)
  }

  completionMessage(edit = false) {
    this.notificationService
      .notificacion(
        'Éxito',
        `Registro ${edit ? 'editado' : 'guardado'}.`,
        'save',
      )
      .afterClosed()
      .subscribe((_) => {});
  }

  private _filter(value: any): any[] {
    const filterValue = value?.toLowerCase();
    
    return this.catCompanies.filter(option => option?.company_name?.toLowerCase()?.includes(filterValue));
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
