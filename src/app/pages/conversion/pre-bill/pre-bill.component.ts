import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ConversionService } from '../conversion.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ModalBillingComponent } from '../modal-billing/modal-billing.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pre-bill',
  templateUrl: './pre-bill.component.html',
  styleUrl: './pre-bill.component.scss'
})
export class PreBillComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

 public objData :any;
 public objDataTest = {
  "id": "e433f9cc-9111-4816-a85c-071b8915455e",
  "dateAndHour": "04-16-2024 11:54:45",
  "moneyInAccount": true,
  "quoteNumber": 19,
  "isBilled": false,
  "companyInfo": {
      "company_name": "Patito 3",
      "tax_id_number": "PAT030305SDS",
      "payment_method_id": "3ec74ab5-e587-49c5-9e16-338f0e967e3d",
      "way_to_pay_id": "fe1f43b1-6c2f-481a-8ea5-c114ef571bb6",
      "payment_condition_id": "90393aa9-9246-40d4-8cc6-5d7ccf2aae0b",
      "invoice_use_id": "d9026ef1-6882-4ebc-93b1-ac340bb6a226",
      "invoice_status": "84cc6072-f4e0-4780-b87c-49087af2b7e4"
  },
  "companyName": {
      "id": "8627204b-c344-49f4-a755-b17ec0aa6b89",
      "name": "Patito 3",
      "logo": "../../../assets/images/default.png"
  },
  "companyNameMain": "Patito 3",
  "status": "Cliente",
  "stateCountry": "México",
  "information": {
      "name": "Aprobada PC",
      "quoteNumber": 19
  },
  "actionurl": false,
  "actionEdit": false,
  "actionDelete": false,
  "showSelect": false,
  "showMoney": false,
  "showBilling": true,
  "totalPrice": [
      {
          "name": "OP1:",
          "expire": "04-30-2024",
          "total": "$2,100.00"
      }
  ],
  "products": [
      {
          "type": "Normal",
          "places": 5,
          "product": [
              "Seguridad en Edificios y locales de trabajo"
          ],
          "selected": true,
          "total": "$1,810.34"
      }
  ],
  "actions": [],
  "status_id": "f4fa3c48-8b48-4d39-ad09-a6699a66459f",
  "actionStatusId": "f4fa3c48-8b48-4d39-ad09-a6699a66459f",
  "actionName": "f4fa3c48-8b48-4d39-ad09-a6699a66459f",
  "closeSale": [
      {
          "totalPrice": {
              "id": "a1253e67-785a-426b-a59f-0f1d9e24a97c",
              "name": "OP1:",
              "expire": "04-30-2024",
              "total": "$2,100.00"
          },
          "product": {
              "type": "Normal",
              "places": 5,
              "products": [
                  "Seguridad en Edificios y locales de trabajo"
              ],
              "total": "$2,100.00"
          }
      }
  ]
}
  constructor(
    private moduleServices: ConversionService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.moduleServices.getData().pipe(takeUntil(this.onDestroy)).subscribe((data) => {
      console.log('DATOS A FACTURAR: ', data);
      this.objData = data
    });
  }

  billing() {
    this.dialog.open(ModalBillingComponent, {
      data: {
        // info: this.objData,
        info: this.objDataTest,
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
    .afterClosed()
    .subscribe((_) => {});
  }

  toBack(){
    this.router.navigateByUrl(`/home/conversion/cotizaciones`)
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
