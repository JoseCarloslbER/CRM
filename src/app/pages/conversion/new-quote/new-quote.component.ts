import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalNewProductComponent } from 'app/pages/admin/main-products/products/modal-new-product/modal-new-product.component';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Observable, Subject, debounceTime, map, startWith, take, takeUntil } from 'rxjs';
import { ConversionService } from '../conversion.service';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import moment from 'moment';
import * as entity from '../conversion-interface';
import { CatalogsService } from 'app/shared/services/catalogs.service';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrl: './new-quote.component.scss'
})
export class NewQuoteComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();
  public filteredOptions: Observable<any[]>;

  public addContact = new FormControl('')

  public productFormValues: any[] = [];
  public optionFormValues: any[] = [];

  public url = document.location.href;

  public company = new FormControl(null);

  public formData = this.formBuilder.group({
    contact: [''],
    user: [''],
    campaign: [''],
    payment_method: [''],
    tax_include: [false],
  });

  public catCompanies: any[] = [];
  public catAgents: entityGeneral.DataCatAgents[] = [];
  public catCampaing: entityGeneral.DataCatCampaing[] = [];
  public catPaymentMethod: entityGeneral.DataCatPaymentMethod[] = [];
  public catProducts: entityGeneral.DataCatProducts[] = [];
  public catContacts: entityGeneral.DataCatContact[] = [];

  public objEditData: any;

  public companySelected: string = '';
  public idData: string = '';

  constructor(
    private moduleServices: ConversionService,
    private catalogsServices: CatalogsService,
    private activatedRoute: ActivatedRoute,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.getCatalogs()
    }, 100);

    this.filteredOptions = this.company.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngAfterViewInit(): void {
    this.company.valueChanges.pipe(debounceTime(500)).subscribe(resp => {
      this.filteredOptions.pipe(take(1)).subscribe(options => {
        const selectedCompany = options.find(cat => cat.company_name === resp);
        if (selectedCompany) {
          let filter = `company_id=${selectedCompany.company_id}`;
          this.getCatalogContact(filter);
        }
      });
    });
  }

  getId() {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe((params:any) => {
      if (params.id) this.getDataById(params.id);
        else {
          this.addFormOption();
        }
    });
  }

  getDataById(id:string) {
    this.moduleServices.getDataId(id).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: any) => {
        this.objEditData = response;
        console.log(response);
        this.formData.patchValue(this.objEditData);
        this.company.patchValue(this.objEditData.company.name);
        this.companySelected = this.objEditData.company.id;
        this.objEditData.quoteOptions.forEach(resp => {
          this.addFormOption(resp)
        })
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  getCatalogs() {
    this.catalogsServices.getCatCompany().subscribe({
      next: (data: entityGeneral.DataCatCompany[]) => {
        this.catCompanies = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatAgents().subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catAgents = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCampaing().subscribe({
      next: (data: entityGeneral.DataCatCampaing[]) => {
        this.catCampaing = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatPaymentMethod().subscribe({
      next: (data: entityGeneral.DataCatPaymentMethod[]) => {
        this.catPaymentMethod = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatProducts().subscribe({
      next: (data: entityGeneral.DataCatProducts[]) => {
        this.catProducts = data;
      },
      error: (error) => console.error(error)
    })

    this.getId()

  }

  getCatalogContact(filter?: string) {
    this.catalogsServices.getCatDataContact(filter).subscribe({
      next: (data: entityGeneral.DataCatContact[]) => {
        this.catContacts = data;
      },
      error: (error) => console.error(error)
    })
  }

  actionSave() {
    let options: any[] = [...this.getOptionsValues()];
    let objData: any = {
      ...this.formData.value,
      company : this.companySelected,
    }

    objData.quote_options = options;
    // objData.subtotal = parseFloat(objData.subtotal) ;
    console.log(objData);
    
    // if (this.idData) this.saveDataPatch(objData)
    // else this.saveDataPost(objData)
  }

  saveDataPost(objData) {
    this.moduleServices.postData(objData).subscribe({
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

  getOptionsValues() {
    const formValues = (e: any) => {
      const formattedDate = moment(e.dateControl.value).format('YYYY-MM-DD');
      const formattedTime = moment(e.timeControl.value, 'HH:mm').format('HH:mm');
      const combinedDateTime = moment(`${formattedDate}T${formattedTime}:00.000Z`).toISOString();

      const productValues = e.product.map((productControl: any) => {
        return {
          ...({ option_product_id: productControl.id }),
          quantity: productControl.placesControl.value,
          product: productControl.productControl.value,
          price: productControl.unitPriceControl.value,
          total: productControl.totalPriceControl.value,
        };
      });

      let obj = {
        ...({ quote_option_id: e.id }),
        subtotal: parseFloat(e.subtotalControl.value),
        discount: e.discountControl.value,
        total: e.totalControl.value,
        type_price: e.typePriceControl.value,
        deadline: combinedDateTime,
        option_products: productValues
      }

      return obj
    };

    return this.optionFormValues.map(formValues);
  }

  deleteOptionValue(index: number) {
    this.optionFormValues.splice(index, 1)
  }

  addFormOption(datos?: any) {
    const instance: any = {
      ...(datos && { id: datos?.id }),
      subtotalControl: new FormControl({ value: datos?.subtotal || '', disabled: true }, Validators.required),
      discountControl: new FormControl({ value: datos?.discount || '', disabled: false }),
      totalControl: new FormControl({ value: datos?.total || '', disabled: true }, Validators.required),
      typePriceControl: new FormControl({ value: datos?.typePrice || '1', disabled: false }, Validators.required),
      dateControl: new FormControl({ value: datos?.date || '', disabled: false }, Validators.required),
      timeControl: new FormControl({ value: datos?.time || '', disabled: false }, Validators.required),
      product: [],
    };
  
    if (datos && datos.optionProducts) {
      datos.optionProducts.forEach((productData: any) => {
        const productInstance: any = this.createProductInstance(productData);
        this.enableProductFields(productInstance);

        instance.product.push(productInstance);
      });
    } else {
      const newProductInstance: any = this.createProductInstance();
      instance.product.push(newProductInstance);
    }
    this.setupOptionControlSubscriptions(instance);
    this.optionFormValues.push(instance);
  }
  
  createProductInstance(productData?: any): any {
    const productInstance: any = {
      ...(productData && { id: productData.id }),
      placesControl: new FormControl({ value: productData?.places || '', disabled: true }, Validators.required),
      productControl: new FormControl({ value: productData?.product || '', disabled: false }, Validators.required),
      unitPriceControl: new FormControl({ value: productData?.unitPri || '', disabled: true }, Validators.required),
      totalPriceControl: new FormControl({ value: productData?.total || '', disabled: true }, Validators.required),
    };
  
    this.setupProductControlSubscriptions(productInstance);
  
    return productInstance;
  }
  
  addAdditionalProduct(optionIndex: number) {
    const newProductInstance: any = this.createProductInstance();
    this.optionFormValues[optionIndex]?.product.push(newProductInstance);
  }
  
  private setupProductControlSubscriptions(productInstance: any) {
    productInstance.productControl.valueChanges.subscribe((selectedProduct: any) => {
      this.updateProductPrice(productInstance, selectedProduct);
      this.updateSubtotal();
      this.enableProductFields(productInstance);
    });
  
    productInstance.placesControl.valueChanges.subscribe((newPlacesValue: number) => {
      this.updateProductTotalPrice(productInstance, newPlacesValue);
      this.updateSubtotal();
    });

    productInstance.unitPriceControl.valueChanges.subscribe((newUnitPrice: any) => {
      this.updateProductTotalPriceManually(productInstance, newUnitPrice);
      this.updateSubtotal();
    });
  }
  
  updateProductPrice(productInstance: any, selectedProduct: any) {
    const selectedProductInfo = this.catProducts.find(product => product.product_id === selectedProduct);
  
    if (selectedProductInfo) {
      const listPrice: any = selectedProductInfo.list_price;
      const placesValue = productInstance.placesControl.value;
      const newTotal = listPrice * placesValue;
  
      productInstance.unitPriceControl.setValue(parseFloat(listPrice).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
      productInstance.totalPriceControl.setValue(newTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    }
  }
  
  updateProductTotalPrice(productInstance: any, newPlacesValue: number) {
    const listPrice = parseFloat(productInstance.unitPriceControl.value.replace(/,/g, ''));
    const newTotal = listPrice * newPlacesValue;
  
    productInstance.totalPriceControl.setValue(newTotal.toFixed(2));
  }
  
  updateSubtotal() {
    this.optionFormValues.forEach((optionInstance: any) => {
      let subtotal = 0;
  
      optionInstance.product.forEach((productInstance: any) => {
        subtotal += this.parseNumber(productInstance.totalPriceControl.value) || 0;
      });
  
      optionInstance.subtotalControl.setValue(subtotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
  
      const discountValue = optionInstance.discountControl.value;
      const discount = this.parseNumber(discountValue) || 0;
  
      const total = (subtotal - discount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
  
      optionInstance.totalControl.setValue(parseFloat(total.replace(/,/g, '')));
    });
  }


  updateProductTotalPriceManually(productInstance: any, newUnitPrice: any) {
    const placesValue = productInstance.placesControl.value;
    const newTotal = newUnitPrice * placesValue;
  
    productInstance.totalPriceControl.setValue(newTotal.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
  }

  updateTotalWithDiscount(productInstance: any, newDiscount: any) {
    const subtotal = this.parseNumber(productInstance?.subtotalControl?.value) || 0;
    const discount = this.parseNumber(newDiscount) || 0;
  
    const total = (subtotal - discount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  
    productInstance.totalControl.setValue(parseFloat(total.replace(/,/g, '')));
  }

  private setupOptionControlSubscriptions(optionInstance: any) {
    optionInstance.discountControl.valueChanges.subscribe((newDiscount: any) => {
      this.updateTotalWithDiscount(optionInstance, newDiscount);
    });
  }

  newDataProduct() {
    this.dialog.open(ModalNewProductComponent, {
      data: null,
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
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
      .subscribe((_) => this.toBack());
  }

  parseNumber(value: any): number {
    return parseFloat(typeof value === 'string' ? value.replace(/,/g, '') : value) || 0;
  }

  enableProductFields(productInstance: any) {
    const shouldEnable = !!productInstance.productControl.value; 

    productInstance.placesControl[shouldEnable ? 'enable' : 'disable']();
    productInstance.unitPriceControl[shouldEnable ? 'enable' : 'disable']();
    productInstance.totalPriceControl[shouldEnable ? 'enable' : 'disable']();
  }
  
  private _filter(value: any): any[] {
    const filterValue = value?.toLowerCase();

    return this.catCompanies.filter(option => option?.company_name?.toLowerCase()?.includes(filterValue));
  }

  get canSave() {
    const formValues = (e: any) => {
      if (
        !e?.dateControl.value ||
        !e?.totalControl.value ||
        !e?.timeControl.value ||
        !e?.subtotalControl.value ||
        !e?.product ||  // Asegúrate de que e.product exista
        e?.product.some((productControl: any) => 
          !productControl.placesControl?.value
        )
      ) {
        return false;
      }
  
      return true;
    };
  
    return this.optionFormValues.every(formValues);
  }

  toBack() {
    this.router.navigateByUrl(`/home/conversion/cotizaciones`)
  }

  toDetailQuote() {
    this.router.navigateByUrl(`/home/conversion/detalle-cotizacion/1`)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
