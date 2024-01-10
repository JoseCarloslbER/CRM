import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'app/shared/material/material.module';
import { ADMIN_ROUTES } from './admin.routes';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './main-users/users/users.component';
import { MainUsersComponent } from './main-users/main-users.component';
import { UsersRolComponent } from './main-users/users-rol/users-rol.component';



@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    MainUsersComponent,
    UsersComponent,
    UsersRolComponent
  
  ],
  imports: [
    CommonModule,
    ADMIN_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
