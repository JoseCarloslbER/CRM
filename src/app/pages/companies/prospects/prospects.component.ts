import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prospects',
  templateUrl: './prospects.component.html',
  styleUrls: []
})
export class ProspectsComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  // TABLA 

  public displayedColumns: string[] = [
    'name', 
    'estatus', 
    'country', 
    'origin', 
    'category', 
    'giro', 
    'campaign', 
    'fechaUltimoContacto', 
    'history', 
    'actions', 
  ];

  public dataDummy: any[] = [
    {
      
      estatus: 'LEAD',
      country: 'México',
      category: 'Micro',
      giro: 'Construccion',
      campaign: 'Activa',
      cotizaciones : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],
    
      ventas : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],

      history: 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      origen: 'Referencia',
      fechaUltimoContacto: '2022-02-28',
    },
  ]

  public fechaHoy = new Date();


  public formFilters = this.formBuilder.group({
    estatus: [{ value: null, disabled: false }],
    giro: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  constructor(

    private openModalsService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
  }

  SearchWithFilters() {
    console.log(this.formFilters.value);
  }



  newProspect() {
    this.router.navigateByUrl(`/home/empresas/nuevo-prospecto`)
  }

}
