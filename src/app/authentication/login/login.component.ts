import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FuseAlertType } from '@fuse/components/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
    .c-main {
      position: relative;
      display: flex;
      width: 100vw;
      display: flex;
      justify-content: center;
      height: 100vh;

      img {
        width :267px;
        margin: auto;
      }
    }
  `
  ],
})
export class LoginComponent implements OnInit {

  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };
  signInForm: UntypedFormGroup;
  showAlert: boolean = false;

  constructor(
    private _formBuilder: UntypedFormBuilder,
  ) {
  }

  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      user: ['', Validators.required],
      rememberMe: [''],
    });
  }

  signIn(): void {
  }
}
