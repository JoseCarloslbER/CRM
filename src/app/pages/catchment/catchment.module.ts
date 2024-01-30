import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CATCHMENT_ROUTES } from './catchment.routes';
import { CatchmentComponent } from './catchment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'app/shared/material/material.module';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { NewCampingnComponent } from './campaigns/new-campingn/new-campingn.component';
import { ModalInformationInTableComponent } from './campaigns/modal-information-in-table/modal-information-in-table.component';
import { ModalCampaignResultsComponent } from './campaigns/modal-campaign-results/modal-campaign-results.component';
import { CampainResultsComponent } from './campaigns/campain-results/campain-results.component';

@NgModule({
  declarations: [
    CatchmentComponent,
    CampaignsComponent,
    NewCampingnComponent,
    ModalInformationInTableComponent,
    ModalCampaignResultsComponent,
    CampainResultsComponent
  ],
  imports: [
    CommonModule,
    CATCHMENT_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
  ]
})
export class CatchmentModule { }
