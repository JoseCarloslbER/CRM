import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { modalInfoTable } from 'app/shared/interfaces/TableColumns';
import { Subject, takeUntil } from 'rxjs';
import { CatchmentService } from '../../catchment.service';
import { DataAgentsTable, DataTableCompanies } from '../../catchment-interface';

@Component({
  selector: 'app-modal-information-in-table',
  templateUrl: './modal-information-in-table.component.html',
  styleUrl: './modal-information-in-table.component.scss'
})
export class ModalInformationInTableComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[]

  private agentInfoColumns: string[] = [
    'agent',
    'rol',
    'ip',
    'extension'
  ]

  private dataAgent: any[] = [
    {
      agent: 'Agente 1',
      isMain: 'Agente principal',
      rol: 'Atención a cliente',
      ip: '12354',
      extension: '3002',
    },
    {
      agent: 'Agente 2',
      rol: 'Ventas',
      ip: '12354',
      extension: '3002',
    },
    {
      agent: 'Agente 3',
      rol: 'Marketing',
      ip: '12354',
      extension: '3002',
    },
    {
      agent: 'Agente 1',
      isMain: 'Agente principal',
      rol: 'Atención a cliente',
      ip: '12354',
      extension: '3002',
    },
    {
      agent: 'Agente 2',
      rol: 'Ventas',
      ip: '12354',
      extension: '3002',
    },
    {
      agent: 'Agente 3',
      rol: 'Marketing',
      ip: '12354',
      extension: '3002',
    },
    {
      agent: 'Agente 1',
      isMain: 'Agente principal',
      rol: 'Atención a cliente',
      ip: '12354',
      extension: '3002',
    },
    {
      agent: 'Agente 2',
      rol: 'Ventas',
      ip: '12354',
      extension: '3002',
    },
    {
      agent: 'Agente 3',
      rol: 'Marketing',
      ip: '12354',
      extension: '3002',
    },
  ]

  private companyInfoColumns: string[] = [
    'company',
    'contact',
    'status'
  ]

  private datacompany: any[] = [
    {
      company: 'RECK SOLUCIONES',
      status: 'LEAD',
      contact: [
        {
          nombre: 'Ing Alberto Avendaño',
          email: 'aavendano@anpasa.com',
          telefono: 'N/A',
          celular: '5516349327',
        }
      ],
    },
    {
      company: 'RECK SOLUCIONES',
      status: 'LEAD',
      contact: [
        {
          nombre: 'Ing Alberto Avendaño',
          email: 'aavendano@anpasa.com',
          telefono: 'N/A',
          celular: '5516349327',
        }
      ],
    },
    {
      company: 'RECK SOLUCIONES',
      status: 'LEAD',
      contact: [
        {
          nombre: 'Ing Alberto Avendaño',
          email: 'aavendano@anpasa.com',
          telefono: 'N/A',
          celular: '5516349327',
        }
      ],
    },
    {
      company: 'RECK SOLUCIONES',
      status: 'LEAD',
      contact: [
        {
          nombre: 'Ing Alberto Avendaño',
          email: 'aavendano@anpasa.com',
          telefono: 'N/A',
          celular: '5516349327',
        }
      ],
    },
    {
      company: 'RECK SOLUCIONES',
      status: 'LEAD',
      contact: [
        {
          nombre: 'Ing Alberto Avendaño',
          email: 'aavendano@anpasa.com',
          telefono: 'N/A',
          celular: '5516349327',
        }
      ],
    },
    {
      company: 'RECK SOLUCIONES',
      status: 'LEAD',
      contact: [
        {
          nombre: 'Ing Alberto Avendaño',
          email: 'aavendano@anpasa.com',
          telefono: 'N/A',
          celular: '5516349327',
        }
      ],
    },
    {
      company: 'RECK SOLUCIONES',
      status: 'LEAD',
      contact: [
        {
          nombre: 'Ing Alberto Avendaño',
          email: 'aavendano@anpasa.com',
          telefono: 'N/A',
          celular: '5516349327',
        }
      ],
    },
    {
      company: 'RECK SOLUCIONES',
      status: 'LEAD',
      contact: [
        {
          nombre: 'Ing Alberto Avendaño',
          email: 'aavendano@anpasa.com',
          telefono: 'N/A',
          celular: '5516349327',
        }
      ],
    },

  ]

  constructor(
    private moduleServices: CatchmentService,
    @Inject(MAT_DIALOG_DATA) public data: modalInfoTable,
    private dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
    if (this.data.type == 'agents') {
      this.displayedColumns = this.agentInfoColumns
      this.dataSource.data = this.dataAgent;
      // this.getAgents()
    } else {
      // this.getCompanies()
      this.displayedColumns = this.companyInfoColumns
      this.dataSource.data = this.datacompany
    }
  }


  getAgents() {
    this.moduleServices.getDataAgents('').pipe(takeUntil(this.onDestroy)).subscribe({
      next: ({ data }: DataAgentsTable) => {
        this.dataSource.data = data;
      },
      error: (error) => console.error(error)
    })
  }

  getCompanies() {
    this.moduleServices.getDataCompanies('').pipe(takeUntil(this.onDestroy)).subscribe({
      next: ({ data }: DataTableCompanies) => {
        this.dataSource.data = data;
      },
      error: (error) => console.error(error)
    })
  }

  closeModal() {
    this.dialogRef.close({
      close: true
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
