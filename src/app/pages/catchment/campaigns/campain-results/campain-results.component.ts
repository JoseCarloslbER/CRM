import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from 'app/pages/companies/companies.service';
import { ReactivationService } from 'app/pages/reactivation/reactivation.service';

@Component({
  selector: 'app-campain-results',
  templateUrl: './campain-results.component.html',
  styleUrl: './campain-results.component.scss'
})
export class CampainResultsComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSubscription: Subscription;
  public data: any;

  public url = document.location.href;


  constructor(
    private moduleServices: ReactivationService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe(({type}) => {
      console.log(type);
      if (type == 'calls') {
        this.getDataCalls()
      }
    });

  }

  ngAfterViewInit(): void {
 
  }

  getDataCalls() {
    this.moduleServices.getData().subscribe((data) => {
      this.data = data;
      console.log(data);
    });
  }

  
  toBack(){
    this.router.navigateByUrl(`/home/${this.url.includes('dashboard') ? 'dashboard/campanias' : 'captacion/campanias'}`)
  }


  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
