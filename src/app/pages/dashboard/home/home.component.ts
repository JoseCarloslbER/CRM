import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';
import { ApexOptions } from 'apexcharts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  
	public fechaHoy = new Date();

  public chartWeeklyExpenses: ApexOptions = {};


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

  ngOnInit(): void {
    this.chartWeeklyExpenses = {
      chart  : {
          animations: {
              enabled: false,
          },
          fontFamily: 'inherit',
          foreColor : 'inherit',
          height    : '100%',
          type      : 'line',
          sparkline : {
              enabled: true,
          },
      },
      colors : ['#22D3EE'],
      series : [
        {
            name: "Expenses",
            data: [
                4412,
                4345,
                4541,
                4677,
                4322,
                4123
            ]
        }
    ],
      stroke : {
          curve: 'smooth',
      },
      tooltip: {
          theme: 'dark',
      },
      xaxis  : {
          type      : 'category',
          categories: [
            "26 Oct - 02 Nov",
            "03 Nov - 10 Nov",
            "11 Nov - 18 Nov",
            "19 Nov - 26 Nov",
            "27 Nov - 04 Dec",
            "05 Dec - 12 Dec"
        ],
      },
      yaxis  : {
          labels: {
              formatter: (val): string => `$${val}`,
          },
      },
  }
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