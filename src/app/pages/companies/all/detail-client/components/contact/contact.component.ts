import { Component, Input, OnInit } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewContactComponent } from './modal-new-contact/modal-new-contact.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  private onDestroy = new Subject<void>();

  @Input() contacts:string = '';
  @Input() idCompany:string = '';

  constructor(
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log('this.contacts', this.contacts);
  }

  newContact() {
    this.dialog.open(ModalNewContactComponent, {
      data: {
        info : this.idCompany
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
    .afterClosed()
    .subscribe((resp) => {
      if (resp) {
        this.contacts = resp.allsContacts
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
