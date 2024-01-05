import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { REACTIVATION_ROUTES } from './reactivation.routes';
import { MaterialModule } from 'app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DiaryComponent } from './diary/diary.component';
import { PendingCallsComponent } from './pending-calls/pending-calls.component';
import { ReactivationComponent } from './reactivation.component';



@NgModule({
  declarations: [
    DiaryComponent,
    PendingCallsComponent,
    ReactivationComponent
  ],
  imports: [
    CommonModule,
    REACTIVATION_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ]
})
export class ReactivationModule { }
