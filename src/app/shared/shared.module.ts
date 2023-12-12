import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitlesComponent } from './components/titles/titles.component';

@NgModule({
	declarations: [TitlesComponent],
	imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
	exports: [TitlesComponent],
})
export class SharedModule {}