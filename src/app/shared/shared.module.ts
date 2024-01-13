import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitlesComponent } from './components/titles/titles.component';
import { ShortcutsComponent } from './layout/common/shortcuts/shortcuts.component';

@NgModule({
	declarations: [TitlesComponent],
	imports: [
		CommonModule, 
		MaterialModule, 
		FormsModule, 
		ReactiveFormsModule,
		ShortcutsComponent
	
	],
	exports: [TitlesComponent],
})
export class SharedModule {}