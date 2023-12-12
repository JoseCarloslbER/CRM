import { Component } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation/confirmation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {
  

  selectedProject: string = 'Estadísticas';

  constructor(private notificationService: FuseConfirmationService){

  }


  probar() {
    this.notificationService.open(
      {
        title: 'hola',
        actions : {
          confirm : {
            show : true,
            color: 'warn'
          }
        }
        
      },
    
    )}
  }