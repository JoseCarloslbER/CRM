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
    'nombre',
    'fechainicial',
    'fechaFinal',
    'fechaRegistro',
    'fechaFinalizacion',
    'tipoCampania',
    'agentePrincipal',
    'ventas',
    'cotizaciones',
    'agente',
    'acciones',
  ];

  public dataDummyCampaign: any[] = [
    {
      noSerie: 'CD4557',
      nombre: 'Orgánico - Google',
      fechainicial: '2022-02-28',
      fechaFinal: '2022-02-28',
      fechaRegistro: '2022-02-28',
      fechaFinalizacion: '2022-02-28',
      tipoCampania: '2022-02-28',
      agentePrincipal: 'Soporte (Administrador)',
      ventas: [
        {
          izq: '0',
          der: '1',

        }
      ],
      cotizaciones: [
        {
          izq: '0',
          der: '1',

        }
      ],
 
    },
    {
      noSerie: 'CD4557',
      nombre: 'Orgánico - Google',
      fechainicial: '2022-02-28',
      fechaFinal: '2022-02-28',
      fechaRegistro: '2022-02-28',
      fechaFinalizacion: '2022-02-28',
      tipoCampania: '2022-02-28',
      agentePrincipal: 'Soporte (Administrador)',
      ventas: [
        {
          izq: '0',
          der: '1',

        }
      ],
      cotizaciones: [
        {
          izq: '0',
          der: '1',

        }
      ],
 
    },
    {
      noSerie: 'CD4557',
      nombre: 'Orgánico - Google',
      fechainicial: '2022-02-28',
      fechaFinal: '2022-02-28',
      fechaRegistro: '2022-02-28',
      fechaFinalizacion: '2022-02-28',
      tipoCampania: '2022-02-28',
      agentePrincipal: 'Soporte (Administrador)',
      ventas: [
        {
          izq: '0',
          der: '1',

        }
      ],
      cotizaciones: [
        {
          izq: '0',
          der: '1',

        }
      ],
 
    },
  ]

  ngOnInit(): void {
    this.dataSource.data = this.dataDummyCampaign
  }
}
