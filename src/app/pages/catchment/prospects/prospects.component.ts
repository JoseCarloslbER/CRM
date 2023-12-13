import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-prospects',
  templateUrl: './prospects.component.html',
  styleUrl: './prospects.component.scss'
})
export class ProspectsComponent implements OnInit {
	public fechaHoy = new Date();


  public formFilters = this.formBuilder.group({
    estatus: [{ value: null, disabled: false }],
    giro: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void { }

  SearchWithFilters(){
    console.log(this.formFilters.value);
  }

}
