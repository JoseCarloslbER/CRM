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
import { CompaniesService } from 'app/pages/companies/companies.service';
import { cloneDeep } from 'lodash';

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
    contact: [''],
    user: ['', Validators.required],
    campaign: [''],
    payment_method: ['', Validators.required],
    // tax_include: [false, Validators.required],
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
  public backToDetail: string = '';

  private changeIva: boolean = false;
  private initial: boolean = false;

  constructor(
    private moduleServices: ConversionService,
    private catalogsServices: CatalogsService,
    private moduleCompanieServices: CompaniesService,
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

    this.moduleCompanieServices.getData().pipe(takeUntil(this.onDestroy)).subscribe((data) => {
      if (data) {
        this.companySelected = data.id
        this.company.patchValue(data.name);
        this.company.disable()
        this.backToDetail = `/home/empresas/detalles-empresa/${data.id}`;
        if (this.companySelected) this.getCatalogContact(data.id)
      }
    });
  }

  ngAfterViewInit(): void {
    this.company.valueChanges.pipe(debounceTime(500)).subscribe(resp => {
      this.filteredOptions.pipe(take(1)).subscribe(options => {
        const selectedCompany = options.find(cat => cat.company_name === resp);
        if (selectedCompany) this.getCatalogContact(selectedCompany.company_id);
      });
    });

    this.formData.get('tax_include').valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(resp => {
      this.optionFormValues.forEach(control => {
        control.product.forEach((productInstance: any) => {
          const unitPrice = parseFloat(productInstance.unitPriceControl.value.replace(/,/g, ''));
          const placesValue = productInstance.placesControl.value;

          if (resp) {
            let listPrice = unitPrice / 1.16;
            productInstance.unitPriceControl.setValue(listPrice.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }));

            if (placesValue) {
              const total = listPrice * placesValue;
              productInstance.totalPriceControl.setValue(total.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }));
            }
          } else {
            let totalPrice = unitPrice * 1.16;
            productInstance.unitPriceControl.setValue(totalPrice.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }));

            if (placesValue) {
              const total = totalPrice * placesValue;
              productInstance.totalPriceControl.setValue(total.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }));
            }
          }
        });

        if (!resp) {
          this.optionFormValues.forEach(control => {
            control.ivaControl.setValue('');
          });
        } else {
          this.optionFormValues.forEach(control => {
            let subtotal = parseFloat(control?.subtotalControl?.value.replace(/,/g, ''))
            let discount = control?.discountControl?.value;
            let tax = (subtotal - discount) * 0.16;

            if (tax) {
              control.ivaControl.setValue((tax).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }));
            }
          });
        }

        this.updateSubtotal();
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
        this.catCompanies = data['data'];
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

  getCatalogContact(id?: string) {
    let filter = `company_id=${id}`;

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
    // if (this.objEditData) this.saveDataPatch(objData)
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

  addFormOption(datos?: any) {
    const instance: any = {
      ...(datos && { id: datos?.id }),
      subtotalControl: new FormControl({ value: datos?.subtotal || '', disabled: true }, Validators.required),
      discountControl: new FormControl({ value: datos?.discount || 0, disabled: datos?.discount ? false : true }),
      totalControl: new FormControl({ value: datos?.total || '', disabled: true }, Validators.required),
      ivaControl: new FormControl({ value: datos?.tax || '', disabled: true }),
      typePriceControl: new FormControl({ value: datos?.typePrice ? datos.typePrice : this.optionFormValues.length >= 1 && !this.objEditData ? 2 : 1, disabled: false }, Validators.required),
      dateControl: new FormControl({ value: datos?.date || '', disabled: false }, Validators.required),
      product: []
    };

    if (datos && datos.optionProducts) {
      datos.optionProducts.forEach((productData: any, productIndex: number) => {
        const productInstance: any = this.createProductInstance(productData);
        instance.product.push(productInstance);
        this.enableProductFields(productInstance);
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
        discount: typeof control?.discountControl?.value == 'number' ? control.discountControl.value : parseFloat(control?.discountControl?.value?.replace(/,/g, '')),

        type_price: control.typePriceControl.value,
        deadline: formattedDate,
        option_products: productValues,
        quote_option: index + 1,
        tax: parseFloat(control.ivaControl.value),
      }

      return obj;
    };

    return this.optionFormValues.map(formValues);
  }

  createProductInstance(productData?: any): any {
    const productInstance: any = {
      ...(productData && { id: productData.id }),
      placesControl: new FormControl(
        { value: productData?.places || '', disabled: productData?.places ? false : true },
        [Validators.required, (control: FormControl) => control.value > 0 ? null : { 'positiveNumber': true }]
      ),
      productControl: new FormControl({ value: productData?.product || '', disabled: false }, Validators.required),
      unitPriceControl: new FormControl(
        { value: productData?.unitPri || '', disabled: productData?.unitPri ? false : true },
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

  setupProductControlSubscriptions(productInstance: any) {
    this.initial = true;

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
      if (!isNaN(newUnitPrice)) {
        this.updateProductTotalPriceManually(productInstance, newUnitPrice);
        this.updateSubtotal();
      }
    });
  }

  updateProductPrice(productInstance: any, selectedProduct: any) {
    // SACAR INFO DEL PRODCTO SELECCIONADO
    const selectedProductInfo = this.catProducts.find(product => product.product_id === selectedProduct);

    if (selectedProductInfo) {
      const listPrice: any = selectedProductInfo.list_price;
      const placesValue = productInstance.placesControl.value;

      let totalPrice: any
      if (!this.formData.get('tax_include').value) {
        let iva: any = listPrice * 0.16;
        let listPriceTwo = Number(listPrice);
        totalPrice = (listPriceTwo + iva);
      } else {
        totalPrice = listPrice
      }

      // INSERTAR DATO EN PRECIO UNITARIO 
      console.log('insertar info del producto');

      productInstance.unitPriceControl.setValue(parseFloat(totalPrice).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));


      if (placesValue) {
        const newTotal = totalPrice * placesValue;

        // INSERTAR DATOS EN PRECIO TOTAL CON LUAGRES INSERTADOS
        productInstance.totalPriceControl.setValue(newTotal.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }));

      } else {

        // INSERTAR DATOS EN PRECIO TOTAL SIN LUGARES INSERRTADOS
        productInstance.totalPriceControl.setValue(parseFloat(totalPrice).toLocaleString('en-US', {
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

      // INSERTAR DATOS EN PRECIO TOTAL 
      productInstance.totalPriceControl.setValue(newTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));

    } else {

      // INSERTAR DATOS EN PRECIO TOTAL 
      productInstance.totalPriceControl.setValue(listPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    }
  }

  recalculateFormValues() {
    this.optionFormValues.forEach(control => {
      let subtotal = parseFloat(control?.subtotalControl?.value.replace(/,/g, ''));
      let discount = control?.discountControl?.value;
      let tax = (subtotal - discount) * 0.16;

      if (this.formData.get('tax_include').value) {
        control.ivaControl.setValue((tax).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }));
      } else {
        control.ivaControl.setValue('');
      }

      let total = subtotal - discount;
      if (this.formData.get('tax_include').value) {
        total += tax;
      }
      control.totalControl.setValue(total.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));

      control.product.forEach(productInstance => {
        let listPrice = parseFloat(productInstance.unitPriceControl.value.replace(/,/g, ''));
        let newUnitPrice: number;

        if (this.formData.get('tax_include').value) {
          newUnitPrice = listPrice;
        } else {
          let iva = listPrice * 0.16;
          newUnitPrice = listPrice + iva;
        }

        productInstance.unitPriceControl.setValue(newUnitPrice.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }));

        let newTotal = newUnitPrice * productInstance.placesControl.value;
        productInstance.totalPriceControl.setValue(newTotal.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }));
      });

      this.updateSubtotal();
    });
  }

  updateSubtotal(value?: any) {
    this.optionFormValues.forEach((optionInstance: any) => {
      let subtotal = 0;
      let total = 0;
      const discountValue = optionInstance.discountControl.value;
      const discount = this.parseNumber(discountValue) || 0;

      optionInstance.product.forEach((productInstance: any) => {
        subtotal += this.parseNumber(productInstance.totalPriceControl.value) || 0;
      })

      if (subtotal) {
        let tax = (subtotal - discount) * 0.16;

        optionInstance.subtotalControl.setValue(subtotal.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }));

        if (this.formData.get('tax_include').value) {
          total = (subtotal - discount) + tax;
        } else {
          total = (subtotal - discount);
        }

        optionInstance.totalControl.setValue(total.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }));

        if (this.formData.get('tax_include').value) {
          optionInstance.ivaControl.setValue((tax).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }));
        } else {
          optionInstance.ivaControl.setValue('');
        }
      }

      if (value && optionInstance?.product.length >= 1) {
        let tax = (subtotal - discount) * 0.16;
        let totalPrice: any;

        if (this.formData.get('tax_include').value) {
          totalPrice = (subtotal - discount) + tax;
        } else {
          totalPrice = (subtotal - discount);
        }

        optionInstance.discountControl.enable();

        const total = (totalPrice).toLocaleString('en-US', {
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

      if (this.formData.get('tax_include').value) {
        let tax = (subtotal - discount) * 0.16;
        productInstance.ivaControl.setValue((tax).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }));
      } else {
        productInstance.ivaControl.setValue('');
      }

      const total = (subtotal - discount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      // INSERTAR EN TOTAL CON DESCUENTO 
      productInstance.totalControl.setValue(total);
    }
  }

  setupOptionControlSubscriptions(optionInstance: any) {
    optionInstance.discountControl.valueChanges.subscribe((newDiscount: any) => {
      this.updateTotalWithDiscount(optionInstance, newDiscount);
    });
  }

  deleteOptionValue(index: number) {
    this.optionFormValues.splice(index, 1)
  }

  deleteProductValue(index: number, indexOption: number) {
    for (let i = 0; i < this.optionFormValues.length; i++) {
      let data = this.optionFormValues[indexOption];
      let productOption = data.product.splice(index, 1)
      let unitPrice = productOption[0].totalPriceControl?.value;
      let totalPrice = data.totalControl?.value;
      let result = (parseFloat(totalPrice.replace(/,/g, '')) - parseFloat(unitPrice.replace(/,/g, ''))).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
      data.subtotalControl.setValue(result)
      data.totalControl.setValue(result)
      break;
    }
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

  _filter(value: any): any[] {
    const filterValue = value?.toLowerCase();
    return this.catCompanies.filter(option => option?.company_name?.toLowerCase()?.includes(filterValue));
  }

  get canSave() {
    let save: boolean = true;

    if (this.formData.valid) {
      if (this.optionFormValues?.length) {
        this.optionFormValues.forEach(control => {
          if (
            !control?.subtotalControl?.value ||
            !control?.typePriceControl?.value ||
            !control?.totalControl?.value ||
            !control?.dateControl?.value ||
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
    if (this.backToDetail) {
      this.router.navigateByUrl(this.backToDetail)
    } else {
      this.router.navigateByUrl(`/home/conversion/cotizaciones`)
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
