import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { ActivitiesAgentComponent } from './activities-agent/activities-agent.component';
import { DASHBOARD_ROUTES } from './dashboards.routes';
import { MaterialModule } from 'app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [DashboardComponent, ActivitiesAgentComponent, HomeComponent, PipelineComponent],
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
