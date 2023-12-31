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
import { ModalNewContactComponent } from './companies/components/contact/modal-new-contact/modal-new-contact.component';
import { QuotesComponent } from './companies/components/quotes/quotes.component';
import { ContactComponent } from './companies/components/contact/contact.component';
import { AdvertisingComponent } from './companies/components/advertising/advertising.component';
import { DocumentsComponent } from './companies/components/documents/documents.component';
import { ModalNewDocumentComponent } from './companies/components/documents/modal-new-document/modal-new-document.component';
import { HistoryComponent } from './companies/components/history/history.component';
import { FormatoFechaPipe } from '../../shared/pipe/fecha.pipe';
import { CallsComponent } from './companies/components/calls/calls.component';



@NgModule({
  declarations: [
    AcquisitionComponent, 
    CompaniesComponent, 
    ModalNewCompanyComponent, 
    DetailClientComponent,
    ModalNewActivityComponent, 
    ModalNewContactComponent,
    QuotesComponent,
    ContactComponent,
    AdvertisingComponent,
    DocumentsComponent,
    ModalNewDocumentComponent,
    HistoryComponent,
    FormatoFechaPipe,
    CallsComponent
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
