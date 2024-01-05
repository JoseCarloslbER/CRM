import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'app/shared/material/material.module';
import { MANAGEMENT_ROUTES } from './management.routes';
import { ManagementComponent } from './management.component';
import { ActivitiesComponent } from './activities/activities.component';



@NgModule({
  declarations: [
    ManagementComponent,
    ActivitiesComponent
  ],
  imports: [
    CommonModule,
    MANAGEMENT_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ]
})
export class ManagementModule { }
