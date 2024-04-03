import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import * as entity from '../companies-interface';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalFastQuoteComponent } from '../prospects/modal-fast-quote/modal-fast-quote.component';
import { TableDataOrigin } from 'app/pages/config/config-interface';
import { CatalogsService } from 'app/shared/services/catalogs.service';
import { ModalNewProductComponent } from '../../admin/main-products/products/modal-new-product/modal-new-product.component';
import moment from 'moment';
import { CompaniesService } from '../companies.service';

@Component({
  selector: 'app-new-client-or-prospect',
  templateUrl: './new-client-or-prospect.component.html',
  styleUrl: './new-client-or-prospect.component.scss'
})
export class NewClientOrProspectComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();
  private formatTimer: ReturnType<typeof setTimeout>;

  public addContact = new FormControl(true)
  public movilPhoneContact = new FormControl('', [Validators.pattern(/^\d{10}$/)])
  public nameContact = new FormControl('')
  public contacts: any[] = []
  public valuesContacts: any[] = []

  public url = document.location.href;
  public modalTitle: string = '';
  public esClient: boolean = false;

  public formData = this.formBuilder.group({
    company_name: ['', Validators.required],
    platform: ['', Validators.required],
    phone_number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    email: ['', Validators.required],
    tax_id_number: [''],
    state: [''],
    campaign: [''],
    owner_user: [''],
    country: [''],
    business: [''],
    city: [''],
    address: [''],
    company_type: [''],
    company_size: [''],
    web_page: ['https://', [Validators.required, Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)]],
    comments: ['', Validators.required],
    logo: [null]
  });

  public taxInclude = new FormControl(true)

  public catCompaniesSizes: entityGeneral.DataCatCompanySize[] = [];
  public catCompaniesTypes: entityGeneral.DataCatCompanyType[] = [];
  public catCountries: entityGeneral.DataCatCountry[] = [];
  public catCampaing: entityGeneral.DataCatCampaing[] = [];
  public catStates: entityGeneral.DataCatState[] = [];
  public catCities: entityGeneral.DataCatCity[] = [];
  public catBusiness: entityGeneral.DataCatBusiness[] = [];
  public catAgents: entityGeneral.DataCatAgents[] = [];
  public catOrigin: TableDataOrigin[] = [];

  public title: string = 'cliente';

  public objEditData: any;
  public dashboardQuote: boolean = false;

  public productFormValues: any[] = [];
  public optionFormValues: any[] = [];
  public company = new FormControl(null);
  public catProducts: entityGeneral.DataCatProducts[] = [];

  constructor(
    private notificationService: OpenModalsService,
    private moduleServices: CompaniesService,
    private catalogsServices: CatalogsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.verifyType()
  }

  verifyType() {
    this.getId()

    if (this.url.includes('prospecto') && this.url.includes('dashboard')) {
      this.addContact.patchValue(false)
      this.title = 'prospecto';
      this.dashboardQuote = true;
      this.getCatalogsInitial();
    } else if (this.url.includes('prospecto')) {
      this.title = 'prospecto';
      this.addContact.patchValue(false)
      this.getCatalogsInitial();
    } else if (this.url.includes('cliente')) {
      this.getCatalogs();
    } else {
      this.title = 'lead';
      this.getCatalogs();
    }
  }

  ngAfterViewInit(): void {
    this.addContact.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(resp => {
      if (resp) {
        this.asignValidators(true);
        this.getCatalogs();

      } else this.asignValidators(false);
    })

    this.taxInclude?.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(resp => {
      if (!resp) {
        this.optionFormValues.forEach(control => {
          control.ivaControl.setValue('');
        });
      } else {
        this.optionFormValues.forEach(control => {
          let total_number = parseFloat(control?.subtotalControl?.value.replace(/,/g, '')) - control?.discountControl?.value;
          let tax = total_number - (total_number / 1.16);
          
          control.ivaControl.setValue((tax).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }));
        });
      }
    })
  }

  getId() {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe((params: any) => {
      if (params.id) this.getDataById(params.id);
      else if (!params.id && this.url.includes('dashboard')) this.addFormOption();
    });
  }

  getDataById(id: string) {
    this.moduleServices.getDataId(id).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: any) => {
        console.log(response);
        
        this.isCompleted(response)
        this.objEditData = response;
        this.formData.patchValue({ ...this.objEditData });
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  getCatalogsInitial() {
    this.catalogsServices.getCatOrigin().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: TableDataOrigin[]) => {
        this.catOrigin = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatProducts().subscribe({
      next: (data: entityGeneral.DataCatProducts[]) => {
        this.catProducts = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCampaing().subscribe({
      next: (data: entityGeneral.DataCatCampaing[]) => {
        this.catCampaing = data;
      },
      error: (error) => console.error(error)
    });
  }


  getCatalogs() {
    this.getCatalogsInitial()

    this.catalogsServices.getCatAgents().subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catAgents = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCompanySize().subscribe({
      next: (data: entityGeneral.DataCatCompanySize[]) => {
        this.catCompaniesSizes = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCompanyType().subscribe({
      next: (data: entityGeneral.DataCatCompanyType[]) => {
        this.catCompaniesTypes = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCountry().subscribe({
      next: (data: entityGeneral.DataCatCountry[]) => {
        this.catCountries = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatState().subscribe({
      next: (data: entityGeneral.DataCatState[]) => {
        this.catStates = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCity().subscribe({
      next: (data: entityGeneral.DataCatCity[]) => {
        this.catCities = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatBusiness().subscribe({
      next: (data: entityGeneral.DataCatBusiness[]) => {
        this.catBusiness = data;
      },
      error: (error) => console.error(error)
    });
  }

  formPatchData() {
    this.formData.patchValue({ ...this.objEditData })
    this.addFormContact(this.objEditData.conctacts)
  }

  actionSave() {
    let contacts: entity.CompanyContacts[] = [...this.getContactsValue()];
    let options: any[] = [...this.getOptionsValues()];

    let objData: any = {
      ...this.formData.value
    }

    if ((!contacts.length && !this.addContact.value)) {
      contacts.push({
        full_name: this.nameContact.value,
        movil_phone: this.movilPhoneContact.value,
      });
      objData.company_contacts = contacts;
    }

    if (contacts.length) objData.company_contacts = contacts;

    objData.tax_include = this.taxInclude.value;

    if (this.url.includes('prospecto')) objData.company_phase = 'ec43fa4e-1ade-46ea-9841-1692074ce8cd';
    else objData.company_phase = 'd1203730-3ac8-4f06-b095-3ec56ef3b54d';

    console.log('OBJETO :', objData);

    // if (this.dashboardQuote) {
    //   this.saveDataQuotePost({
    //     company: objData,
    //     quote_options: options
    //   })
    // } else if (this.objEditData) this.saveDataPatch(objData);
    // else this.saveDataPost(objData);
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
    this.moduleServices.patchData(this.objEditData.id, objData).subscribe({
      next: () => {
        this.completionMessage(true)
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  saveDataQuotePost(objData) {
    this.moduleServices.postDataQuote(objData).subscribe({
      next: (response: any) => {
        this.notificationService
          .notificacion(
            'Éxito',
            `Registro guardado.`,
            'save',
          )
          .afterClosed()
          .subscribe((_) => {
            this.toQuoteDetail(response.quote_id)

          });
        // this.completionMessage()
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  addFormContact(datos?: any) {
  console.log('addFormContact', datos);
    
    const instance: any = {
      ...(datos && { id: datos.id }),
      fullNameControl: new FormControl({ value: datos?.nombre || '', disabled: false }, Validators.required),
      emailControl: new FormControl({ value: datos?.correo || '', disabled: false }, [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
      localPhone: new FormControl({ value: datos?.correo || '', disabled: false }, [Validators.required, Validators.pattern(/^\d{10}$/)]),
      positionControl: new FormControl({ value: datos?.correo || '', disabled: false }, Validators.required),
      movilPhoneControl: new FormControl({ value: datos?.correo || '', disabled: false }, [Validators.required, Validators.pattern(/^\d{10}$/)]),
      extControl: new FormControl({ value: datos?.correo || '', disabled: false }),
    };

    this.valuesContacts.push(instance);
  }

  getContactsValue() {
    const contactValues = (e: any) => {
      let obj = {
        full_name: e.fullNameControl.value,
        email: e.emailControl.value,
        local_phone: e.localPhone.value,
        position: e.positionControl.value,
        movil_phone: e.movilPhoneControl.value,
        ext: e.extControl.value,
      }

      return obj
    };

    return this.valuesContacts.map(contactValues);
  }

  deleteContact(index: number) {
    this.valuesContacts.splice(index, 1)
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
        discount: control.discountControl.value,
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

  addFormOption(datos?: any) {
    const instance: any = {
      ...(datos && { id: datos?.id }),
      subtotalControl: new FormControl({ value: datos?.subtotal || '', disabled: true }, Validators.required),
      discountControl: new FormControl({ value: datos?.discount || 0, disabled: datos?.discount ? false : true }),
      totalControl: new FormControl({ value: datos?.total || '', disabled: true }, Validators.required),
      ivaControl: new FormControl({ value: datos?.tax || '', disabled: true }),
      typePriceControl: new FormControl({ value: datos?.typePrice || this.optionFormValues.length >= 1 ? 2 : 1, disabled: false }, Validators.required),
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
      if (!isNaN(newUnitPrice)) {
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
      const discountValue = optionInstance.discountControl.value;
      const discount = this.parseNumber(discountValue) || 0;

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

        if (this.taxInclude?.value) {
          let total_number = subtotal - discount;
          let tax = total_number - (total_number / 1.16);
          optionInstance.ivaControl.setValue((tax).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }));
        } else {
          optionInstance.ivaControl.setValue('');
        }
      }

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

      if (this.taxInclude?.value) {
        console.log(productInstance);
        let total_number = subtotal - discount;
        let tax = total_number - (total_number / 1.16);
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

      productInstance.totalControl.setValue(total);
    }
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
        if (close) this.router.navigateByUrl(`/home/conversion/nueva-cotizacion`)
        else this.router.navigateByUrl(`/home/empresas/${this.url.includes('prospecto') ? 'prospectos' : 'clientes'}`)
      });
  }

  toBack() {
    this.router.navigateByUrl(`/home/empresas/${this.url.includes('todos') ? 'todos' : this.url.includes('prospecto') ? 'prospectos' : 'clientes'}`)
  }

  toBackClient() {
    this.router.navigateByUrl(`/home/empresas/clientes`)
  }

  toAll() {
    this.router.navigateByUrl(`/home/empresas/todos`)
  }

  toQuoteDetail(id: String) {
    this.router.navigateByUrl(`/home/conversion/detalle-cotizacion/${id}`)
  }

  enableOrDisableInputs(accion = false) {
    const key = accion ? 'enable' : 'disable';
    this.formData.get('name')?.[key]();
  }

  isCompleted(data: entity.GetDataCompanyMapper) {
    if (data.country || data.company_type || data.city) this.addContact.patchValue(true);
  }

  asignValidators(accion = false) {
    const newFormGroup = this.formBuilder.group({ ...this.formData.getRawValue() });

    if (accion) {
      newFormGroup.get('country')?.setValidators(Validators.required);
      newFormGroup.get('state')?.setValidators(Validators.required);
      newFormGroup.get('city')?.setValidators(Validators.required);
      newFormGroup.get('company_type')?.setValidators(Validators.required);
      newFormGroup.get('company_size')?.setValidators(Validators.required);
      newFormGroup.get('business')?.setValidators(Validators.required);
      newFormGroup.get('tax_id_number')?.setValidators([Validators.required, Validators.minLength(12), Validators.maxLength(12)]);
    } else {
      newFormGroup.get('country')?.clearValidators();
      newFormGroup.get('state')?.clearValidators();
      newFormGroup.get('city')?.clearValidators();
      newFormGroup.get('company_type')?.clearValidators();
      newFormGroup.get('company_size')?.clearValidators();
      newFormGroup.get('business')?.clearValidators();
      newFormGroup.get('tax_id_number')?.clearValidators();
    }

    newFormGroup.updateValueAndValidity();
    this.formData = newFormGroup;
  }

  get canSave() {
    let save: boolean = true;

    if (this.formData.valid) {
      if (this.valuesContacts.length) {
        this.valuesContacts.forEach(control => {
          if (
            !control?.fullNameControl?.value ||
            !control?.emailControl?.value ||
            !control?.localPhone?.value ||
            !control?.positionControl?.value ||
            !control?.movilPhoneControl?.value) {
            save = false;
          }
        });
      }

      if (this.optionFormValues?.length) {
        this.optionFormValues.forEach(control => {
          if (
            !control?.subtotalControl?.value ||
            !control?.typePriceControl?.value ||
            !control?.totalControl?.value ||
            !control?.dateControl?.value ||
            !control?.product ||
            control?.product.some((productControl: any) =>
              !productControl.placesControl?.value
            )
          ) {
            save = false;
          }
        });
      }
    }
    else save = false;
    return save
  }

  configInput(event: Event, type: string, control?: string, index?:number): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const sanitizedValue = inputValue.replace(/\D/g, '');

    if (type == 'movilPhoneContact') {
      this.movilPhoneContact?.patchValue(sanitizedValue, { emitEvent: false });
    } else if (type == 'form') {
      const formControl = this.formData.get(control);
      if (formControl) formControl.setValue(sanitizedValue, { emitEvent: false });

    } else if (index !== undefined  && this.valuesContacts[index]) {
      this.valuesContacts[index][control]?.patchValue(sanitizedValue, { emitEvent: false });
    }
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

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.formData.patchValue({ logo: file });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
