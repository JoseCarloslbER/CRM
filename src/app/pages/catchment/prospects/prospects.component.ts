import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  public displayedColumns: string[] = ['prospectos', 'contacto', 'estatus', 'cotizacionesRapidas', 'origen', 'fechaUltimoContacto', 'siguienteActividad', 'fechaVencimiento', 'siguienteActividad2', 'siguienteActividad3', 'siguienteActividad4'
  , 'siguienteActividad5', 'siguienteActividad6', 'siguienteActividad7', 'siguienteActividad8', 'siguienteActividad9'
];
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
      // siguienteActividad : 'Se envió correo publicitario y se hicieron .',
      siguienteActividad : 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento. // Procedemos a cerrar las cotizaciones #1090 y #1091. // Si las vuelven a necesitar, las volvemos a abrir.',
      fechaVencimiento : '2022-02-28',
      siguienteActividad2 : 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento. // Procedemos a cerrar las cotizaciones #1090 y #1091. // Si las vuelven a necesitar, las volvemos a abrir.',
      siguienteActividad3 : 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento. // Procedemos a cerrar las cotizaciones #1090 y #1091. // Si las vuelven a necesitar, las volvemos a abrir.',
      siguienteActividad4 : 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento. // Procedemos a cerrar las cotizaciones #1090 y #1091. // Si las vuelven a necesitar, las volvemos a abrir.',
    }
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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    // this.dataSource.data = this.dataDummy
   }

  SearchWithFilters(){
    console.log(this.formFilters.value);
  }

}
