import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { DASHBOARD_ROUTES } from './dashboards.routes';
import { MaterialModule } from 'app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { GoalsComponent } from './goals/goals.component';
import { ModalBonusProgressComponent } from './goals/modal-bonus-progress/modal-bonus-progress.component';
import { ModalAgentsComponent } from './goals/modal-agents/modal-agents.component';



@NgModule({
  declarations: [
    DashboardComponent, 
    HomeComponent, 
    PipelineComponent,
    CampaignsComponent,
    GoalsComponent,
    ModalBonusProgressComponent,
    ModalAgentsComponent
  
  ],
  imports: [
    CommonModule,
    DASHBOARD_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
