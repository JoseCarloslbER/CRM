import { NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ClassyLayoutComponent } from './classy/classy.component';

@Component({
    selector     : 'layout',
    templateUrl  : './layout.component.html',
    styleUrls    : ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [NgIf, ClassyLayoutComponent],
})
export class LayoutComponent {}
