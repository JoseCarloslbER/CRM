import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
// import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss'
})
export class QuotesComponent {

  constructor(private notificationService: FuseConfirmationService){

  }



    probar() {
      this.notificationService.open(
        {
          title: 'hola'
        }
      )
    }

}
