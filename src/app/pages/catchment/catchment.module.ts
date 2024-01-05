import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CATCHMENT_ROUTES } from './catchment.routes';
import { ProspectsComponent } from './prospects/prospects.component';
import { CatchmentComponent } from './catchment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'app/shared/material/material.module';
import { NewProspectComponent } from './new-prospect/new-prospect.component';

@NgModule({
  declarations: [
    CatchmentComponent,
    ProspectsComponent, 
    NewProspectComponent
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
