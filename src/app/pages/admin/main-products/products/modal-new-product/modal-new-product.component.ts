import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'app/pages/admin/admin.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject, takeUntil } from 'rxjs';
import * as entity from '../../../admin-interface';
import * as entityGeneral from '../../../../../shared/interfaces/general-interface';

@Component({
  selector: 'app-modal-new-product',
  templateUrl: './modal-new-product.component.html',
  styleUrl: './modal-new-product.component.scss'
})
export class ModalNewProductComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public formData = this.formBuilder.group({
    code: [null, Validators.required],
    name: [null, Validators.required],
    price: [null, Validators.required],
    link: [null, Validators.required],
    product_category_id: [null, Validators.required],
    country_id: [null, Validators.required],
    status_id: [null, Validators.required]
  });

  public catCountries: entityGeneral.DataCatCountry[] = [];
  public catProductCategories: entityGeneral.DataCatProductCategory[] = [];


  private idData: string = '';
  private objEditData: entity.GetDataProduct;

  constructor(
    private moduleServices: AdminService,
    private formBuilder: FormBuilder,
    private notificationService: OpenModalsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
    console.log(this.data?.idEdit);

    if (this.data?.idEdit) {
      this.idData = this.data.idEdit
      this.getDataId();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getCatalogs()
    }, 500);
  }

  getCatalogs() {
    this.moduleServices.getCatCountry().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatCountry[]) => {
        this.catCountries = data;
      },
      error: (error) => console.error(error)
    });

    this.moduleServices.getCatProductCategory().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatProductCategory[]) => {
        this.catProductCategories = data;
      },
      error: (error) => console.error(error)
    });
  }

  actionSave() {

    let objData: any = {
      ...this.formData.value,
    }

    console.log(objData);
    this.completionMessage(true);

    // if (this.idData) this.saveDataPatch(objData)
    //  else this.saveDataPost(objData)
  }

  getDataId() {
    this.moduleServices.getDataProductId(this.idData).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: any) => {
        this.objEditData = response;
        this.formData.patchValue(response)
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  saveDataPost(objData: entity.PostDataProduct) {
    this.moduleServices.postDataProduct(objData).pipe(takeUntil(this.onDestroy)).subscribe({
      next: () => {
        this.completionMessage()
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  saveDataPatch(objData: entity.PostDataProduct) {
    this.moduleServices.patchDataProduct(this.idData, objData).pipe(takeUntil(this.onDestroy)).subscribe({
      next: () => {
        this.completionMessage(true)
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
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
      .subscribe((_) => { this.closeModal() });
  }

  closeModal() {
    this.dialogRef.close({ close: true })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
