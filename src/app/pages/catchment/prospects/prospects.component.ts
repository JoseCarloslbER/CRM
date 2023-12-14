import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ModalNewProspectsComponent } from '../modal-new-prospects/modal-new-prospects.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-prospects',
  templateUrl: './prospects.component.html',
  styleUrl: './prospects.component.scss'
})
export class ProspectsComponent implements OnInit {
	public dataSource = new MatTableDataSource<any>([]);
	@ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
	public total = 0;
	public indicePagina = 0;

  // TABLA 

  public displayedColumns: string[] = ['prospectos', 'contacto', 'estatus', 'cotizacionesRapidas', 'origen', 'fechaUltimoContacto', 'siguienteActividad', 'fechaVencimiento'];
  public dataDummy : any[] = [
    {
      contacto : [
        {
          nombre : 'Ing Alberto Avendaño',
          email : 'aavendano@anpasa.com',
          telefono : 'N/A',
          celular : '5516349327',
        }
      ],
      estatus : 'LEAD',
      cotizaciones : [
        {
          izq : '0',
          der : '1',

        }
      ],
      origen : 'Referencia',
      fechaUltimoContacto : '2022-02-28',
      siguienteActividad : 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento. // Procedemos a cerrar las cotizaciones #1090 y #1091.',
      fechaVencimiento : '2022-02-28',
    },
    {
      contacto : [
        {
          nombre : 'Ing Alberto Avendaño',
          email : 'aavendano@anpasa.com',
          telefono : 'N/A',
          celular : '5516349327',
        }
      ],
      estatus : 'LEAD',
      cotizaciones : [
        {
          izq : '0',
          der : '1',

        }
      ],
      origen : 'Referencia',
      fechaUltimoContacto : '2022-02-28',
      siguienteActividad : 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento. // Procedemos a cerrar las cotizaciones #1090 y #1091.',
      fechaVencimiento : '2022-02-28',
    },
    {
      contacto : [
        {
          nombre : 'Ing Alberto Avendaño',
          email : 'aavendano@anpasa.com',
          telefono : 'N/A',
          celular : '5516349327',
        }
      ],
      estatus : 'LEAD',
      cotizaciones : [
        {
          izq : '0',
          der : '1',

        }
      ],
      origen : 'Referencia',
      fechaUltimoContacto : '2022-02-28',
      siguienteActividad : 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento. // Procedemos a cerrar las cotizaciones #1090 y #1091.',
      fechaVencimiento : '2022-02-28',
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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
   }

  SearchWithFilters(){
    console.log(this.formFilters.value);
  }

  newProspect() {
  // this.openModalsService
	// 		.openModalMedium(ModalNewProspectsComponent, {
	// 			datos: ['test'],
	// 		})
  //     .afterClosed()
	// 		.subscribe((resp: any) => {
      
  //     });

  this.dialog.open(ModalNewProspectsComponent, {
    data : ['test'],
    disableClose: true,
    width: '1000px',
    maxHeight: '628px',
    panelClass: 'custom-dialog',
  });
  }

}
