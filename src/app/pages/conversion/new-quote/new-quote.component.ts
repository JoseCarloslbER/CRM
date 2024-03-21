import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalNewProductComponent } from 'app/pages/admin/main-products/products/modal-new-product/modal-new-product.component';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Observable, Subject, debounceTime, map, startWith, take, takeUntil } from 'rxjs';
import { ConversionService } from '../conversion.service';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import moment from 'moment';
import { CatalogsService } from 'app/shared/services/catalogs.service';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrl: './new-quote.component.scss'
})
export class NewQuoteComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();
  public filteredOptions: Observable<any[]>;
  private formatTimer: ReturnType<typeof setTimeout>;

  public addContact = new FormControl('')

  public productFormValues: any[] = [];
  public optionFormValues: any[] = [];

  public url = document.location.href;

  public company = new FormControl(null);

  public formData = this.formBuilder.group({
    contact: ['', Validators.required],
    user: ['', Validators.required],
    campaign: [''],
    payment_method: ['', Validators.required],
    tax_include: [true, Validators.required],
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
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe((params: any) => {
      if (params.id) this.getDataById(params.id);
      else this.addFormOption();
    });
  }

  getDataById(id: string) {
    this.moduleServices.getDataId(id).subscribe({
      next: (response: any) => {
        this.objEditData = response;
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

    this.getProducts();
    this.getId();
  }

  getProducts() {
    this.catalogsServices.getCatProducts().subscribe({
      next: (data: entityGeneral.DataCatProducts[]) => {
        this.catProducts = data;
      },
      error: (error) => console.error(error)
    })
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
      company: { company_id: this.companySelected },
    };

    objData.quote_options = options;

    console.log(objData);
    if (this.objEditData) this.saveDataPatch(objData)
    else this.saveDataPost(objData)
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

  addFormOption(datos?: any) {
    const instance: any = {
      ...(datos && { id: datos?.id }),
      subtotalControl: new FormControl({ value: datos?.subtotal || '', disabled: true }, Validators.required),
      discountControl: new FormControl({ value: datos?.discount || 0, disabled: true }),
      totalControl: new FormControl({ value: datos?.total || '', disabled: true }, Validators.required),
      typePriceControl: new FormControl({ value: datos?.typePrice || this.optionFormValues.length >= 1 ? 2 : 1, disabled: false }, Validators.required),
      dateControl: new FormControl({ value: datos?.date || '', disabled: false }, Validators.required),
      timeControl: new FormControl({ value: datos?.time || '', disabled: false }, Validators.required),
      product: []
    };

    if (datos && datos.optionProducts) {
      datos.optionProducts.forEach((productData: any, productIndex: number) => {
        const productInstance: any = this.createProductInstance(productData);
        instance.product.push(productInstance);
      });
    } else {
      const newProductInstance: any = this.createProductInstance();
      instance.product.push(newProductInstance);
    }

    this.setupOptionControlSubscriptions(instance);
    this.optionFormValues.push(instance);
  }

  getOptionsValues() {
    const formValues = (control: any, index: number) => {
      const formattedDate = moment(control.dateControl.value).format('YYYY-MM-DD');
      const formattedTime = moment(control.timeControl.value, 'HH:mm').format('HH:mm');
      const combinedDateTime = moment(`${formattedDate}T${formattedTime}:00.000Z`).toISOString();

      const productValues = control.product.map((productControl: any) => {
        return {
          ...({ option_product_id: productControl.id }),
          quantity: productControl.placesControl.value,
          product: productControl.productControl.value,
          price: parseFloat(productControl.unitPriceControl.value.replace(/,/g, '')),
          total: parseFloat(productControl.totalPriceControl.value.replace(/,/g, '')),
        };
      });

      let obj = {
        ...({ quote_option_id: control.id }),
        subtotal: parseFloat(control.subtotalControl.value.replace(/,/g, '')),
        total: parseFloat(control.totalControl.value.replace(/,/g, '')),
        discount: control.discountControl.value,
        type_price: control.typePriceControl.value,
        deadline: combinedDateTime,
        option_products: productValues,
        quote_option: index + 1
      }

      return obj;
    };

    return this.optionFormValues.map(formValues);
  }

  createProductInstance(productData?: any): any {
    const productInstance: any = {
      ...(productData && { id: productData.id }),
      placesControl: new FormControl(
        { value: productData?.unitPri || '', disabled: true },
        [Validators.required, (control: FormControl) => control.value > 0 ? null : { 'positiveNumber': true }]
      ),
      productControl: new FormControl({ value: productData?.product || '', disabled: false }, Validators.required),
      unitPriceControl: new FormControl(
        { value: productData?.unitPri || '', disabled: true },
        [Validators.required, (control: FormControl) => parseFloat(control.value.replace(/,/g, '')) > 0 ? null : { 'positiveNumber': true }]
      ),
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
      this.updateSubtotal(newPlacesValue);
    });

    productInstance.unitPriceControl.valueChanges.subscribe((newUnitPrice: any) => {
      if (!isNaN(newUnitPrice) ) {
        this.updateProductTotalPriceManually(productInstance, newUnitPrice);
        this.updateSubtotal();
      }
    });
  }

  deleteOptionValue(index: number) {
    this.optionFormValues.splice(index, 1)
  }

  deleteProductValue(index: number) {
    this.optionFormValues.forEach(data => {
      console.log(data);
      let productOption = data.product.splice(index, 1)
      let unitPrice = productOption[0].totalPriceControl?.value;
      let totalPrice = data.totalControl?.value;
      let result = (parseFloat(totalPrice.replace(/,/g, '')) - parseFloat(unitPrice.replace(/,/g, ''))).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      data.subtotalControl.setValue(result)
      data.totalControl.setValue(result)
    })
  }

  updateProductPrice(productInstance: any, selectedProduct: any) {
    const selectedProductInfo = this.catProducts.find(product => product.product_id === selectedProduct);

    if (selectedProductInfo) {
      const listPrice: any = selectedProductInfo.list_price;
      const placesValue = productInstance.placesControl.value;

      productInstance.unitPriceControl.setValue(parseFloat(listPrice).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));

      if (placesValue) {
        const newTotal = listPrice * placesValue;

        productInstance.totalPriceControl.setValue(newTotal.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }));
      } else {
        productInstance.totalPriceControl.setValue(parseFloat(listPrice).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }));
      }
    }
  }

  updateProductTotalPrice(productInstance: any, newPlacesValue: number) {
    const listPrice = parseFloat(productInstance.unitPriceControl.value.replace(/,/g, ''));

    if (newPlacesValue && listPrice) {
      const newTotal = listPrice * newPlacesValue;
      productInstance.totalPriceControl.setValue(newTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    } else {
      productInstance.totalPriceControl.setValue(listPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    }
  }

  updateSubtotal(value?: any) {
    this.optionFormValues.forEach((optionInstance: any) => {
      let subtotal = 0;

      optionInstance.product.forEach((productInstance: any) => {
        subtotal += this.parseNumber(productInstance.totalPriceControl.value) || 0;
      })

      if (subtotal) {
        optionInstance.subtotalControl.setValue(subtotal.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }));
        optionInstance.totalControl.setValue(subtotal.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }));
      }

      const discountValue = optionInstance.discountControl.value;
      const discount = this.parseNumber(discountValue) || 0;

      if (value && optionInstance?.product.length >= 1) {
        optionInstance.discountControl.enable();

        const total = (subtotal - discount).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        optionInstance.totalControl.setValue(total);

      } else if (!value && discount && optionInstance?.product.length < 2) {
        optionInstance.discountControl.disable();
        optionInstance.discountControl.patchValue(0);
      }

    });
  }

  updateProductTotalPriceManually(productInstance: any, newUnitPrice: any) {
    const placesValue = productInstance.placesControl.value;

    if (newUnitPrice && placesValue) {
      const newTotal = newUnitPrice * placesValue;
      productInstance.totalPriceControl.setValue(newTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    } else if (newUnitPrice) {
      productInstance.totalPriceControl.setValue(parseFloat(newUnitPrice).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    } else if (!newUnitPrice) {
      productInstance.totalPriceControl.setValue(parseFloat('0').toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    }
  }

  updateTotalWithDiscount(productInstance: any, newDiscount: any) {
    const subtotal = this.parseNumber(productInstance?.subtotalControl?.value) || 0;
    const discount = this.parseNumber(newDiscount) || 0;

    if (subtotal < discount) {
      const total = (subtotal).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      productInstance.discountControl.setValue(total);
    } else {
      const total = (subtotal - discount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      productInstance.totalControl.setValue(total);
    }
  }

  private setupOptionControlSubscriptions(optionInstance: any) {
    optionInstance.discountControl.valueChanges.subscribe((newDiscount: any) => {
      this.updateTotalWithDiscount(optionInstance, newDiscount);
    });
  }

  enableProductFields(productInstance: any) {
    const shouldEnable = !!productInstance.productControl.value;

    productInstance.placesControl[shouldEnable ? 'enable' : 'disable']();
    productInstance.unitPriceControl[shouldEnable ? 'enable' : 'disable']();
  }

  newDataProduct() {
    this.dialog.open(ModalNewProductComponent, {
      data: null,
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
      .afterClosed()
      .subscribe(() => this.getProducts());
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

  private _filter(value: any): any[] {
    const filterValue = value?.toLowerCase();

    return this.catCompanies.filter(option => option?.company_name?.toLowerCase()?.includes(filterValue));
  }

  get canSave() {
    let save: boolean = true;

    if (this.formData.valid) {
      if (this.optionFormValues?.length) {
        this.optionFormValues.forEach(control => {
          console.log(control.product);

          if (
            !control?.subtotalControl?.value ||
            !control?.typePriceControl?.value ||
            !control?.totalControl?.value ||
            !control?.dateControl?.value ||
            !control?.timeControl?.value ||
            !control?.product ||
            control?.product.some((productControl: any) => {
              return !(productControl.unitPriceControl?.value > 0 && productControl.placesControl?.value > 0);
            })
          ) {
            save = false;
          }
        });
      }
    }
    else save = false;
    return save
  }

  onInputChange(event: any, optionIndex: number, productIndex: number) {
    const newValue = event.target.value.replace(/[^\d.]/g, '');
    const currentOption = this.optionFormValues[optionIndex];

    if (this.formatTimer) clearTimeout(this.formatTimer);

    if (event.key === 'Backspace' && event.target.value.includes('.')) return;

    this.formatTimer = setTimeout(() => {
      if (parseFloat(newValue)) {
        let formattedValue = parseFloat(newValue).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        currentOption.product[productIndex].unitPriceControl.setValue(formattedValue);
      } else {
        currentOption.product[productIndex].unitPriceControl.setValue('');
      }
    }, 300);
  }

  cleanCompany() {
    this.company.patchValue('');
    this.companySelected = '';
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
