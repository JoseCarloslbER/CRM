import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'app/shared/material/material.module';
import { CompaniesComponent } from './companies.component';
import { COMPANIES_ROUTES } from './companies.routes';
import { NewProspectComponent } from './prospects/new-prospect/new-prospect.component';
import { ProspectsComponent } from './prospects/prospects.component';
import { AllComponent } from './all/all.component';
import { LeadsComponent } from './leads/leads.component';
import { ClientsComponent } from './clients/clients.component';
import { ModalFastQuoteComponent } from './prospects/modal-fast-quote/modal-fast-quote.component';



@NgModule({
  declarations: [
    CompaniesComponent,
    NewProspectComponent,
    ProspectsComponent,
    AllComponent,
    LeadsComponent,
    ClientsComponent,
    ModalFastQuoteComponent
  ],
  imports: [
    CommonModule,
    COMPANIES_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ]
})
export class CompaniesModule { }
