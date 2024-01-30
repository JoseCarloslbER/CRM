import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campain-results',
  templateUrl: './campain-results.component.html',
  styleUrl: './campain-results.component.scss'
})
export class CampainResultsComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public url = document.location.href;


  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void {
    
  }

  
  toBack(){
    this.router.navigateByUrl(`/home/${this.url.includes('dashboard') ? 'dashboard/campanias' : 'captacion/campanias'}`)
  }


  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
