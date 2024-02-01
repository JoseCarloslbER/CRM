import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthenticationService } from '../authentication.service';
import { Subject, takeUntil } from 'rxjs';

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
export class LoginComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();


  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: '',
  };

  signInForm = this.formBuilder.group({
    email: ['jose@abrevia.com'],
    password: ['123456'],
    user: [''],
    rememberMe: [''],
  });

  showAlert: boolean = false;

  constructor(
    private moduleServices:AuthenticationService,
    private formBuilder: UntypedFormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    
  }

  signIn() {
    let objLogin : any = {
    ...this.signInForm.value
    }

    console.log(objLogin);

    this.moduleServices.login(objLogin).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response) => {
        console.log(response);
        // this.router.navigateByUrl('/home')

      },
      error: (error) => console.error(error)
    })
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
