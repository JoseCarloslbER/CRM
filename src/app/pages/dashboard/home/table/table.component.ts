import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  @Input() displayedColumns: string[] = []
  @Input() dataDummy: string[] = []
  @Input() type: string = ''
  
  ngOnInit(): void {

    console.log(this.type);
    
    console.log(this.displayedColumns);
    
    this.dataSource.data = this.dataDummy
  }
}
