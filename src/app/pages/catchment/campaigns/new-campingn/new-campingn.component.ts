import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-campingn',
  templateUrl: './new-campingn.component.html',
  styleUrl: './new-campingn.component.scss'
})
export class NewCampingnComponent implements AfterViewInit {

  public fechaHoy = new Date();
  
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }


  ngAfterViewInit(): void {
  }
  
  toBack(){
    this.router.navigateByUrl(`/home/captacion/campanias`)
  }
}
