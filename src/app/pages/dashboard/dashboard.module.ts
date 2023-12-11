import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { ActivitiesAgentComponent } from './activities-agent/activities-agent.component';
import { DASHBOARD_ROUTES } from './dashboards.routes';



@NgModule({
  declarations: [DashboardComponent, ActivitiesAgentComponent, HomeComponent, PipelineComponent],
  imports: [
    CommonModule,
    DASHBOARD_ROUTES
  ]
})
export class DashboardModule { }
