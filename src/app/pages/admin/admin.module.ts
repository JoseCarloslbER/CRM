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
import { ProductsComponent } from './products/products.component';
import { DownloadEmailsComponent } from './download-emails/download-emails.component';
import { BonusesComponent } from './main-bonuses/bonuses/bonuses.component';
import { MainBonusesComponent } from './main-bonuses/main-bonuses.component';
import { NewBonoComponent } from './main-bonuses/bonuses/new-bono/new-bono.component';
import { NewUserComponent } from './main-users/users/new-user/new-user.component';
import { NewRolComponent } from './main-users/users-rol/new-rol/new-rol.component';



@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    MainUsersComponent,
    UsersComponent,
    UsersRolComponent,
    ProductsComponent,
    DownloadEmailsComponent,
    BonusesComponent,
    MainBonusesComponent,
    NewUserComponent,
    NewBonoComponent,
    NewRolComponent
  
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
