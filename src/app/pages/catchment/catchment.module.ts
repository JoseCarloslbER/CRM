import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CATCHMENT_ROUTES } from './catchment.routes';
import { ProspectsComponent } from './prospects/prospects.component';
import { ModalNewProspectsComponent } from './modal-new-prospects/modal-new-prospects.component';
import { CatchmentComponent } from './catchment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'app/shared/material/material.module';

@NgModule({
  declarations: [CatchmentComponent, ProspectsComponent, ModalNewProspectsComponent],
  imports: [
    CommonModule,
    CATCHMENT_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ]
})
export class CatchmentModule { }
