import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalNewBonoComponent } from './modal-new-bono/modal-new-bono.component';

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses.component.html',
  styleUrl: './bonuses.component.scss'
})
export class BonusesComponent {
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'name',
    'assignedTask',
    'periodThe',
    'solutions',
    'bonoType',
    'agent',
    'base',
    'meta',
    'comments',

    'acciones'
  ];
 
  
  public dataDummy: any[] = [
    {
      name : 'Apr 2020',
      assignedTask : 'Campaña X',
      agent : 'Ver agentes',
      bonoType : '$000',
      base : 'Fija',
      meta : 'Contactos logrados',
      comments : 'Lorem ipsum',
      periodThe : [
        {
          del : '03/01/2023',
          al :  ' 03/01/2023'
        }
      ],
      solutions : [
        {
          sol1 : 'Solución X',
          sol2 :  ' Solución Y'
        }
      ],
    },
    
    
  ]

  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
  }

  editData() {
    this.dialog.open(ModalNewBonoComponent, {
      data: ['test'],
      disableClose: true,
      width: '1000px',
      maxHeight: '428px',
      panelClass: 'custom-dialog',
    });
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
