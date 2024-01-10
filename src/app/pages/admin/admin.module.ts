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
import { ModalNewUserComponent } from './main-users/users/modal-new-user/modal-new-user.component';
import { NewBonoComponent } from './main-bonuses/bonuses/new-bono/new-bono.component';



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
    ModalNewUserComponent,
    NewBonoComponent
  
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
