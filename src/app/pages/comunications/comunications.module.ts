import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlackComponent } from './slack/slack.component';
import { TawkComponent } from './tawk/tawk.component';
import { COMUNICATIONS_ROUTES } from './comunications.routes';
import { MaterialModule } from 'app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComunicationsComponent } from './comunications.component';



@NgModule({
  declarations: [
    SlackComponent,
    TawkComponent,
    ComunicationsComponent
  ],
  imports: [
    CommonModule,
    COMUNICATIONS_ROUTES,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComunicationsModule { }
