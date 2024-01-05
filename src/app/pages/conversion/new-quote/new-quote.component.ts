import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrl: './new-quote.component.scss'
})
export class NewQuoteComponent implements AfterViewInit {


  public addContact = new FormControl('')
  
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }


  ngAfterViewInit(): void {
    this.addContact.valueChanges.subscribe(resp => {
      console.log(resp);
      
    })
  }
  toBack(){
    this.router.navigateByUrl(`/home/conversion/cotizaciones`)
  }
  
  // newContact() {
  //   this.dialog.open(ModalNewContactComponent, {
  //     data: ['test'],
  //     disableClose: true,
  //     width: '1000px',
  //     maxHeight: '628px',
  //     panelClass: 'custom-dialog',
  //   });
  // }
}
