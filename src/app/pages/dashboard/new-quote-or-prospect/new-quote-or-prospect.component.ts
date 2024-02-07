import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalNewProductComponent } from 'app/pages/admin/main-products/products/modal-new-product/modal-new-product.component';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import * as entity from '../dashboard-interface';

@Component({
  selector: 'app-new-quote-or-prospect',
  templateUrl: './new-quote-or-prospect.component.html',
  styleUrl: './new-quote-or-prospect.component.scss'
})
export class NewQuoteOrProspectComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public formData = this.formBuilder.group({
    name: [null, Validators.required],
    email: [null],
    web: [null],
  });

  public addContact = new FormControl('')

  public contactos: any[] = []
  public valuesContacts: any[] = []
  public productFormValues: any[] = [];
  public optionFormValues: any[] = [];

  public catCompaniesSizes: entity.DataCatCompanySize[] = [];
  public catCompaniesTypes: entity.DataCatCompanyType[] = [];
  public catCountries: entity.DataCatCountry[] = [];
  public catStates: entity.DataCatState[] = [];
  public catCities: entity.DataCatCity[] = [];
  public catBusiness: entity.DataCatBusiness[] = [];

  private idData: string = ''
  private objEditData: any;

  constructor(
    private notificationService: OpenModalsService,
    private moduleServices: DashboardService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getId()
  }

  ngAfterViewInit(): void {
    this.addContact.valueChanges.subscribe(resp => {
      if (resp) this.addFormContact()
    })

    this.getCatalogs()

    setTimeout(() => {
      this.addFormOption();
      this.addFormProduct();
    }, 500);
  }

  getId() {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe(({ id }: any) => {
      if (id) {
        this.idData = id;
        // this.getDataById();
        this.addFormContact(true);
      }
    });
  }

  getCatalogs() {
    this.moduleServices.getCatalogCompanySize().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entity.DataCatCompanySize[]) => {
        this.catCompaniesSizes = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatalogCompanyType().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entity.DataCatCompanyType[]) => {
        this.catCompaniesTypes = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatalogCountry().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entity.DataCatCountry[]) => {
        this.catCountries = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatalogState().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entity.DataCatState[]) => {
        this.catStates = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatalogCity().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entity.DataCatCity[]) => {
        this.catCities = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatalogBusiness().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entity.DataCatBusiness[]) => {
        this.catBusiness = data;
      },
      error: (error) => console.error(error)
    });
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
      priceTypeControl: new FormControl({ value: datos?.time || '', disabled: false })
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
        priceType: e.priceTypeControl.value,
      }

      return obj
    };

    return this.valuesContacts.map(contactValues);
  }

  deleteContact(index: number) {
    this.valuesContacts.splice(index, 1)
  }

  addFormProduct(datos?: any) {
    const instance: any = {
      ...(datos && { id: datos.id }),
      placesControl: new FormControl({ value: datos?.places || '', disabled: false }),
      productControl: new FormControl({ value: datos?.product || '', disabled: false }),
      unitPriControl: new FormControl({ value: datos?.unitPri || '', disabled: false }),
      totalPricePriControl: new FormControl({ value: datos?.totalPricePri || '', disabled: false }),
    };

    this.productFormValues.push(instance);
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

  deleteProductValue(index: number) {
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

  deleteOptionValue(index: number) {
    this.optionFormValues.splice(index, 1)
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
        this.toBack()
      });
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

  toBack() {
    this.router.navigateByUrl(`/home/conversion/detalle-cotizacion/1`)
  }

  get canSave(): boolean {
    return !(this.formData.valid);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
