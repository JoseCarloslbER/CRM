import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MaterialModule } from 'app/shared/material/material.module';
import { modalInfoTable } from 'app/shared/interfaces/TableColumns';



@Component({
  selector: 'app-modal-information-in-table',
  templateUrl: './modal-information-in-table.component.html',
  styleUrl: './modal-information-in-table.component.scss'
})
export class ModalInformationInTableComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns:string[]

  constructor(
		@Inject(MAT_DIALOG_DATA) public data: modalInfoTable,
		private dialogRef: MatDialogRef<any>,
	) { 
  }

  ngOnInit(): void {
    this.displayedColumns = this.data.columns
    this.dataSource.data  = this.data.info
  }

  closeModal() {
		this.dialogRef.close({
      close : true
    })
  }
}
