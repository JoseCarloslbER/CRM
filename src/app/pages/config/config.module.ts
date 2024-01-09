import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ConfigComponent } from './config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'app/shared/material/material.module';
import { CONFIG_ROUTES } from './config.routes';
import { ModalProductComponent } from './products/modal-product/modal-product.component';
import { ActivityTypeComponent } from './activity-type/activity-type.component';
import { WayToPayComponent } from './way-to-pay/way-to-pay.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { CompanyCategoriesComponent } from './company-categories/company-categories.component';



@NgModule({
  declarations: [
    ConfigComponent, 
    ProductsComponent, 
    ModalProductComponent,
    ActivityTypeComponent,
    WayToPayComponent,
    ProductCategoriesComponent,
    CompanyCategoriesComponent
    
  ],
  imports: [
    CommonModule,
    CONFIG_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
  ]
})
export class ConfigModule { }
