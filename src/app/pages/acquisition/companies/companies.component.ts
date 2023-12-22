import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewCompanyComponent } from '../modal-new-company/modal-new-company.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements OnInit {
	public dataSource = new MatTableDataSource<any>([]);
	@ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
	public total = 0;
	public indicePagina = 0;

  public displayedColumns: string[] = ['empresa', 'contacto', 'estatus', 'ventas', 'cotizacionesRapidas', 'cotizacionesFormales', 'categoria', 'origen', 'fechaUltimoContacto', 'siguienteActividad', 'fechaVencimiento'];
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
      categoria : 'LEAD',
      cotizaciones : [
        {
          izq : '0',
          der : '1',

        }
      ],
      ventas : [
        {
          izq : '0',
          der : '1',

        }
      ],
      cotizacionesRapidas : [
        {
          izq : '0',
          der : '1',

        }
      ],
      cotizacionesFormales : [
        {
          izq : '0',
          der : '1',

        }
      ],
      origen : 'Referencia',
      fechaUltimoContacto : '2022-02-28',
      siguienteActividad : 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      fechaVencimiento : '2022-02-28',
    },
    
  ]

	public fechaHoy = new Date();


  public selectedProject: string = 'Todas';

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

  newCompany() {
    // this.openModalsService
    // 		.openModalMedium(ModalNewProspectsComponent, {
    // 			datos: ['test'],
    // 		})
    //     .afterClosed()
    // 		.subscribe((resp: any) => {

    //     });

    this.dialog.open(ModalNewCompanyComponent, {
      data: ['test'],
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    });
  }
}
