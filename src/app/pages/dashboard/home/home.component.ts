import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  
	public fechaHoy = new Date();

  public formFilters = this.formBuilder.group({
    user: [{ value: null, disabled: false }],
    giro: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }, Validators.required],
    rangeDateEnd: [{ value: null, disabled: false }, Validators.required],
  });

  public selectedProject: string = 'Estadísticas';

  constructor(
    private notificationService: FuseConfirmationService,
    private formBuilder: FormBuilder
  ){

  }

  SearhWithFilters(){
    console.log(this.formFilters.value);
  }

  probar() {
    this.notificationService.open(
      {
        title: 'hola',
        actions : {
          confirm : {
            show : true,
            color: 'warn'
          }
        }
      }
    )}
  }