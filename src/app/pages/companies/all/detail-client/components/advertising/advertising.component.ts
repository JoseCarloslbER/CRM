import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-advertising',
  templateUrl: './advertising.component.html',
  styleUrl: './advertising.component.scss'
})
export class AdvertisingComponent implements OnInit {

  public dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
  ]

  ngOnInit(): void {
    this.dataSource.data = this.dataDummyCampaign
  }
}
