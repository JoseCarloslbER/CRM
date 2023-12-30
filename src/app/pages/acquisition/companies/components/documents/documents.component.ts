import { Component } from '@angular/core';
import { ModalNewDocumentComponent } from './modal-new-document/modal-new-document.component';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {

  items: any[] = [
      {
        id: "ae908d59-07da-4dd8-aba0-124e50289295",
        folderId: null,
        name: "Biometric portrait",
        createdBy: "Brian Hughes",
        createdAt: "August 29, 2020",
        modifiedAt: "August 29, 2020",
        size: "4.5 MB",
        type: "PDF",
        contents: null,
        description: null
      },
      {
        id: "ae908d59-07da-4dd8-aba0-124e50289295",
        folderId: null,
        name: "Biometric portrait",
        createdBy: "Brian Hughes",
        createdAt: "August 29, 2020",
        modifiedAt: "August 29, 2020",
        size: "4.5 MB",
        type: "JPG",
        contents: null,
        description: null
      },
      {
        id: "ae908d59-07da-4dd8-aba0-124e50289295",
        folderId: null,
        name: "Biometric portrait",
        createdBy: "Brian Hughes",
        createdAt: "August 29, 2020",
        modifiedAt: "August 29, 2020",
        size: "4.5 MB",
        type: "TXT",
        contents: null,
        description: null
      },
      {
        id: "ae908d59-07da-4dd8-aba0-124e50289295",
        folderId: null,
        name: "Biometric portrait",
        createdBy: "Brian Hughes",
        createdAt: "August 29, 2020",
        modifiedAt: "August 29, 2020",
        size: "4.5 MB",
        type: "XLS",
        contents: null,
        description: null
      },
      {
        id: "ae908d59-07da-4dd8-aba0-124e50289295",
        folderId: null,
        name: "Biometric portrait",
        createdBy: "Brian Hughes",
        createdAt: "August 29, 2020",
        modifiedAt: "August 29, 2020",
        size: "4.5 MB",
        type: "TXT",
        contents: null,
        description: null
      },
      {
        id: "ae908d59-07da-4dd8-aba0-124e50289295",
        folderId: null,
        name: "Biometric portrait",
        createdBy: "Brian Hughes",
        createdAt: "August 29, 2020",
        modifiedAt: "August 29, 2020",
        size: "4.5 MB",
        type: "XLS",
        contents: null,
        description: null
      },

  ]

  public seeDocument = false 
  public documentSelected:any 

  constructor(
    private openModalsService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }
  
  uploadDocument() {
    this.dialog.open(ModalNewDocumentComponent, {
      data: ['test'],
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    });
  }

  seeDocumentInfo(file:any) {
    this.seeDocument = true
    this.documentSelected = file
    console.log(this.documentSelected);
    
  }

  trackByFn(index: number, item: any): any
  {
      return item.id || index;
  }

}
