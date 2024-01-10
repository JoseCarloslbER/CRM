import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-bonuses',
  templateUrl: './main-bonuses.component.html',
  styleUrl: './main-bonuses.component.scss'
})
export class MainBonusesComponent {
  public fechaHoy = new Date();
  
  newData() {
    //   this.dialog.open(ModalnewActivityComponent, {
    //     data: ['test'],
    //     disableClose: true,
    //     width: '1000px',
    //     maxHeight: '428px',
    //     panelClass: 'custom-dialog',
    //   });
    }
}
