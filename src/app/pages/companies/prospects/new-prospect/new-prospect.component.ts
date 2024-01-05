import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalNewContactComponent } from 'app/pages/acquisition/companies/components/contact/modal-new-contact/modal-new-contact.component';

@Component({
  selector: 'app-new-prospect',
  templateUrl: './new-prospect.component.html',
  styleUrl: './new-prospect.component.scss'
})
export class NewProspectComponent implements AfterViewInit{

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
    this.router.navigateByUrl(`/home/empresas/prospectos`)
  }

}
