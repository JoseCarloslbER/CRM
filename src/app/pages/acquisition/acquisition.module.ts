import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from './companies/companies.component';
import { ModalNewCompanyComponent } from './companies/modal-new-company/modal-new-company.component';
import { AcquisitionComponent } from './acquisition.component';
import { ACQUISITION_ROUTES } from './acquisition.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'app/shared/material/material.module';
import { DetailClientComponent } from './companies/detail-client/detail-client.component';
import { ModalNewActivityComponent } from './companies/modal-new-activity/modal-new-activity.component';
import { ModalNewContactComponent } from './companies/modal-new-contact/modal-new-contact.component';



@NgModule({
  declarations: [
    AcquisitionComponent, 
    CompaniesComponent, 
    ModalNewCompanyComponent, 
    DetailClientComponent,
    ModalNewActivityComponent, 
    ModalNewContactComponent  
  ],
  imports: [
    CommonModule,
    ACQUISITION_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ]
})
export class AcquisitionModule { }
