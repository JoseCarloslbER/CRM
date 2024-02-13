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
    'voice_identifier',
    'ext'
  ]

  private companyInfoColumns: string[] = [
    'company',
    'contact',
    'status'
  ]

  public agentData: any[] = []

  constructor(
    private moduleServices: CatchmentService,
    @Inject(MAT_DIALOG_DATA) public data: modalInfoTable,
    private dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
    console.log('MODAL : ', this.data.info);

    if (this.data.type == 'agents') this.getAgents()
     else this.getCompanies()
  }


  getAgents() {
    this.displayedColumns = this.agentInfoColumns;

    let agentData = [this.data.info.main, ...this.data.info.alls.map(all => all.user)];

    agentData.forEach((data: any, index) => {
      if (index == 0) data.main = true;
      data.agent = { img: data.profile_picture.includes('default')
          ? `../../../assets/images${data.profile_picture}`
          : data.profile_picture,
        name: `${data?.first_name || '-'} ${data?.last_name || ''}`,
      };
      data.rol = { main: data.main, rol: data.rol_name }
    })

    this.dataSource.data = agentData;
  }

  getCompanies() {
    this.displayedColumns = this.companyInfoColumns
    
    console.log(this.data.info);
    let companyData = [...this.data.info];

    companyData.forEach((data: any) => {
      console.log(data);
      console.log('************************************');

      data.companyMain = { img: data.company.logo.includes('default')
          ? `../../../assets/images${data.company.logo}`
          : data.company.logo,
        name: `${data.company.company_name}`,
      };

      data.contact = {
        name  : `${data.company.owner_user.first_name} ${data.company.owner_user.last_name}`,
        email : data.company.owner_user.email,
        phone : data.company.owner_user.phone_number
      }
    })

    console.log('resultado final:', companyData);
    

    this.dataSource.data = companyData;
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
