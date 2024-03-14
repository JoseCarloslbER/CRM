import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-bono',
  templateUrl: './new-bono.component.html',
  styleUrl: './new-bono.component.scss'
})
export class NewBonoComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public fechaHoy = new Date();
  public toppings = new FormControl('');
  public toppingList: string[] = ['Empresa A', 'Empresa B', 'Empresa C'];
  public valuesSpecifications: any[] = [];

  public url = document.location.href;
  public isGoal : boolean = false;
  public modalTitle: string = '';


  public formulario = this.formBuilder.group({
    scaleType: ['', Validators.required],
    percentage: ['', Validators.required],
    amount: ['', Validators.required],
  });

  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }


  ngOnInit(): void {
    if (this.url.includes('dashboard')) {
      this.modalTitle = 'Registrar nueva meta'
      this.isGoal = true;
    }
    else {
      this.modalTitle = 'Registrar nuevo bono'
    }
    
    if (this.url.includes('editar')) this.modalTitle = this.modalTitle.replace('Registrar', 'Editar');
    if (this.url.includes('clonar')) this.modalTitle = this.modalTitle.replace('Registrar', 'Clonar');
  }

  ngAfterViewInit(): void {
    this.addFormSpecifications();
  }

  addFormSpecifications(datos?: any) {
    const instance: any = {
      ...(datos && { id: datos.id }),
      scaleTypeControl: new FormControl({ value: datos?.scaleType || '', disabled: false }, Validators.required),
      percentageControl: new FormControl({ value: datos?.percentage || '', disabled: false }, Validators.required),
      amountControl: new FormControl({ value: datos?.amount || '', disabled: false }),
    };

    this.valuesSpecifications.push(instance);
  }

  getSpecificationsValue() {
    const specificationsValues = (e: any) => {
      let obj = {
        scaleType: e.scaleTypeControl.value,
        percentage: e.percentageControl.value,
        amount: e.amountControl.value,
      }

      return obj
    };

    return this.valuesSpecifications.map(specificationsValues);
  }

  deleteSpecifications(index:number) {
    this.valuesSpecifications.splice(index, 1)
  }
  
  getSpecifications() {
    let cont = 0;
    let contactInfo: any[] = [];

    for (const _ of this.valuesSpecifications) {
      contactInfo.push(this.getSpecificationsValue()[cont])
      cont++;
    }
    console.log(contactInfo);
  }


  save(){
    this.notificationService
      .notificacion(
        'Éxito',
        `Registro ${this.url.includes('editar') ? 'editado' : 'guardado'}.`,
        'save',
      )
      .afterClosed()
      .subscribe((_) => {
        this.toBack()
      });
  }

  toBack(){
    this.router.navigateByUrl(`/home/${this.isGoal ? 'dashboard/metas' : 'admin/bonos'}`)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
