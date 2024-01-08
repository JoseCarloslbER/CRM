import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalInformationInTableComponent } from 'app/pages/catchment/campaigns/modal-information-in-table/modal-information-in-table.component';
import { ModalCampaignResultsComponent } from './modal-campaign-results/modal-campaign-results.component';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrl: './campaigns.component.scss'
})
export class CampaignsComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  // TABLA 

  public displayedColumnsCampaign: string[] = [
    'noSerie',
    'fechasInicialFinal',
    'companyType',
    'agents',
    'companies',
    'results',
    'amounInvested',
    'allProspects',
    'allQuotes',
    'totalAllAppointments',
    'totalClosedSales',
    'totalSalesAmount',
    'acciones',
  ];

  public dataDummyCampaign: any[] = [
    {
      noSerie: 'CD4557',
      fechasInicialFinal: [
        {
          inicial: '2022-02-28',
          final: '2022-02-28',

        }
      ],

      companyType: 'Lorem ipsum',
      agent: 'Nombre de agente principal',
      company: '5',
      amounInvested: '$15,000.00',
      cotizaciones : [
        {
          left : '5',
          right : '5',
          bottom : '$15,000.00',
        }
      ],

      totalAllAppointments : [
        {
          left : '$15,000.00',
          right : '$15,000.00',

        }
      ],
      prospects : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],
      
      fechaUltimoContacto: '2022-02-28',
      fechaRegistro: '2022-02-28',
      agentePrincipal: 'Soporte (Administrador)',
    
    },
    {
      noSerie: 'CD4557',
      fechasInicialFinal: [
        {
          inicial: '2022-02-28',
          final: '2022-02-28',

        }
      ],

      companyType: 'Lorem ipsum',
      agent: 'Nombre de agente principal',
      company: '5',
      amounInvested: '$15,000.00',
      cotizaciones : [
        {
          left : '5',
          right : '5',
          bottom : '$15,000.00',
        }
      ],

      totalAllAppointments : [
        {
          left : '$15,000.00',
          right : '$15,000.00',

        }
      ],
      prospects : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],
      
      fechaUltimoContacto: '2022-02-28',
      fechaRegistro: '2022-02-28',
      agentePrincipal: 'Soporte (Administrador)',
    
    },
    {
      noSerie: 'CD4557',
      fechasInicialFinal: [
        {
          inicial: '2022-02-28',
          final: '2022-02-28',

        }
      ],

      companyType: 'Lorem ipsum',
      agent: 'Nombre de agente principal',
      company: '5',
      amounInvested: '$15,000.00',
      cotizaciones : [
        {
          left : '5',
          right : '5',
          bottom : '$15,000.00',
        }
      ],

      totalAllAppointments : [
        {
          left : '$15,000.00',
          right : '$15,000.00',

        }
      ],
      prospects : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],
      
      fechaUltimoContacto: '2022-02-28',
      fechaRegistro: '2022-02-28',
      agentePrincipal: 'Soporte (Administrador)',
    
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

  private agentInfoColumns : string[] = [
    'agent',
    'rol',
    'ip',
    'extension'
  ]

  private dataAgent : any[] = [
    {
      agent : 'Agente 1',
      isMain: 'Agente principal',
      rol : 'Atención a cliente',
      ip : '12354',
      extension : '3002',
    },
    {
      agent : 'Agente 2',
      rol : 'Ventas',
      ip : '12354',
      extension : '3002',
    },
    {
      agent : 'Agente 3',
      rol : 'Marketing',
      ip : '12354',
      extension : '3002',
    },
    {
      agent : 'Agente 1',
      isMain: 'Agente principal',
      rol : 'Atención a cliente',
      ip : '12354',
      extension : '3002',
    },
    {
      agent : 'Agente 2',
      rol : 'Ventas',
      ip : '12354',
      extension : '3002',
    },
    {
      agent : 'Agente 3',
      rol : 'Marketing',
      ip : '12354',
      extension : '3002',
    },
    {
      agent : 'Agente 1',
      isMain: 'Agente principal',
      rol : 'Atención a cliente',
      ip : '12354',
      extension : '3002',
    },
    {
      agent : 'Agente 2',
      rol : 'Ventas',
      ip : '12354',
      extension : '3002',
    },
    {
      agent : 'Agente 3',
      rol : 'Marketing',
      ip : '12354',
      extension : '3002',
    },
  ]

  private companyInfoColumns : string[] = [
    'company',
    'contact',
    'status'
  ]

  private datacompany : any[] = [
    {
      company : 'RECK SOLUCIONES',
      status : 'LEAD',
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
      company : 'RECK SOLUCIONES',
      status : 'LEAD',
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
      company : 'RECK SOLUCIONES',
      status : 'LEAD',
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
      company : 'RECK SOLUCIONES',
      status : 'LEAD',
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
      company : 'RECK SOLUCIONES',
      status : 'LEAD',
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
      company : 'RECK SOLUCIONES',
      status : 'LEAD',
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
      company : 'RECK SOLUCIONES',
      status : 'LEAD',
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
      company : 'RECK SOLUCIONES',
      status : 'LEAD',
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

    private openModalsService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      
      this.dataSource.data = this.dataDummyCampaign
    }, 500);
  }

  SearchWithFilters() {
    console.log(this.formFilters.value);
  }

  newCampaing() {
    this.router.navigateByUrl(`/home/captacion/nueva-campaña`)
  }

  seeAgents() {
    this.dialog.open(ModalInformationInTableComponent, {
      data: {
        info : this.dataAgent,
        columns: this.agentInfoColumns,
        type : 'agents'
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '700px',
      panelClass: 'custom-dialog',
    });
  }

  seeCompanies() {
    this.dialog.open(ModalInformationInTableComponent, {
      data: {
        info : this.datacompany,
        columns: this.companyInfoColumns,
        type : 'companies'
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '700px',
      panelClass: 'custom-dialog',
    });
  }
  
  seeCampaignsResults () {
    this.dialog.open(ModalCampaignResultsComponent, {
      data: {
        info : this.datacompany,
        columns: this.companyInfoColumns,
        type : 'companies'
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '700px',
      panelClass: 'custom-dialog',
    });
  }


}


