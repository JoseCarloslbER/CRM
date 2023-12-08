import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies/companies.component';
import { ModalNewCompanyComponent } from './modal-new-company/modal-new-company.component';
import { AcquisitionComponent } from './acquisition.component';
import { ACQUISITION_ROUTES } from './acquisition.routes';



@NgModule({
  declarations: [AcquisitionComponent, CompaniesComponent, ModalNewCompanyComponent],
  imports: [
    CommonModule,
    ACQUISITION_ROUTES
  ]
})
export class AcquisitionModule { }
