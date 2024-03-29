import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/authentication/authentication.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'settings-account',
  templateUrl: './account.component.html',
})
export class SettingsAccountComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();
  accountForm: UntypedFormGroup;

  public user: any;
  public userbackupData: any;

  constructor(
    private notificationService: OpenModalsService,
    private adminServices: AuthenticationService,
    private _formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.user = this.adminServices.getDecryptedUser();
    console.log(this.user);

    this.accountForm = this._formBuilder.group({
      name: [this.user?.first_name && this.user?.last_name ? this.user.first_name.toUpperCase() + ' ' + this.user.last_name.toUpperCase() : this.user?.first_name.toUpperCase() || '-'],
      username: [this.user?.username || '-'],
      title: ['-'],
      company: ['-'],
      about: ['-'],
      email: [this.user?.email, Validators.email],
      phone: [this.user?.phone_number || '-'],
      country: ['-'],
      language: ['-'],
    });
    this.userbackupData = { ...this.accountForm.value }
  }


  actionSave() {
    this.completionMessage(true)
  }

  completionMessage(edit = false) {
    this.notificationService
      .notificacion(
        'Éxito',
        `Registro ${edit ? 'editado' : 'guardado'}.`,
        'save',
      )
  }

  cancel() {
    this.accountForm.patchValue(this.userbackupData)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
