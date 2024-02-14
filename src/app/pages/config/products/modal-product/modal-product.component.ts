import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompaniesService } from 'app/pages/companies/companies.service';
import { Subject, takeUntil } from 'rxjs';
import * as entity from '../../config-interface';
import * as entityGeneral from '../../../../shared/interfaces/general-interface';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: []
})
export class ModalProductComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public catBusiness: entityGeneral.DataCatBusiness[] = [];

  constructor(
    private moduleServices: CompaniesService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) { }

  ngOnInit(): void {
    console.log(this.data);

    setTimeout(() => {
      this.getCatalogs()
    }, 500);
  }

  getCatalogs() {
    this.moduleServices.getCatalogBusiness().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatBusiness[]) => {
        this.catBusiness = data;
      },
      error: (error) => console.error(error)
    });
  }

  closeModal() {
		this.dialogRef.close({
      close : true
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
