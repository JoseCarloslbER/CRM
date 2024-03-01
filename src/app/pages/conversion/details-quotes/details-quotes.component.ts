import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ConversionService } from '../conversion.service';
import { Subject, takeUntil } from 'rxjs';
import { GetDataQuoteMapper } from '../conversion-interface';

@Component({
  selector: 'app-details-quotes',
  templateUrl: './details-quotes.component.html',
  styleUrl: './details-quotes.component.scss'
})
export class DetailsQuotesComponent implements OnInit {
  private onDestroy = new Subject<void>();

  public objEditData: any;

  public idTest = '9aa67cb4-ccb1-4c01-8d7f-4b269db134ce'
  public quotesOptions: any[] = [];

  constructor(
    private moduleServices: ConversionService,
    private notificationService: OpenModalsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getId();
  }
  
  getId() {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe((params:any) => {
      console.log(params);
      if (params.id) this.getDataById(params.id);
    });
  }

  getDataById(id:string) {
    this.moduleServices.getDataId(id).subscribe({
      next: (response: GetDataQuoteMapper) => {
        this.objEditData = response;
        console.log(response);
        this.quotesOptions = response.quoteOptions;
        console.log(this.quotesOptions);
        
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  sendEmail(){
    this.notificationService
      .notificacion(
        'Éxito',
        'Correo enviado.',
        'save',
      )
      .afterClosed()
      .subscribe((_) => {
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
