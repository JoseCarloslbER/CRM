import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  // TABLA 

  public displayedColumns: string[] = [
    'name', 
    'process', 
    'agent', 
    'activityType', 
    'register', 
    'finally', 
    'comment', 
    'actions', 
  ];

  public dataDummy: any[] = [
    {
      process: 'Actividad Inicial',
      agent: 'Administración (Administrador)',
      activityType: 'Comunicación',
      register: '2023-10-07 11:22:20',
      finally: '2023-10-07 11:22:20',
      comment: 'Envían comprobante // Admin confirma el pago, se le activa M.E y se le notifica al cliente // Se le solicita la CSF // Quedamos atentos',
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

    private notificationService: OpenModalsService,
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

  editData(data:any) {
    this.router.navigateByUrl(`/home/empresas/nuevo-prospecto`)
  }

  seeData(data:any) {
    this.router.navigateByUrl(`home/adquisicion/detalle-empresa/1`)
  }

  newData() {
    this.router.navigateByUrl(`/home/empresas/nuevo-prospecto`)
  }
 
  deleteData() {
    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estas seguro de eliminar el registro?',
        'question',
      )
      .afterClosed()
      .subscribe((_) => {
        this.notificationService
          .notificacion(
            'Éxito',
            'Registro eliminado.',
            'delete',
          )
          .afterClosed()
          .subscribe((_) => {

          });
      });
  }
}
