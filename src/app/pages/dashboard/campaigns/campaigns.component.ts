import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { ApexOptions } from 'apexcharts';


@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss'
})
export class CampaignsComponent {

  public fechaHoy = new Date();


  public formFilters = this.formBuilder.group({
    user: [{ value: null, disabled: false }],
    giro: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  public selectedProject: string = 'Estadísticas';

  constructor(
    private notificationService: FuseConfirmationService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {

  }


  onTabChange(event: MatTabChangeEvent): void {
    console.log(event.tab.textLabel);
  }

  SearchWithFilters() {
    console.log(this.formFilters.value);
  }

  probar() {
    this.notificationService.open(
      {
        title: 'hola',
        actions: {
          confirm: {
            show: true,
            color: 'warn'
          }
        }
      }
    )
  }





}
