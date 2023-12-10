import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MaterialModule } from './shared/material/material.module';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    standalone : true,
    imports    : [RouterOutlet, MaterialModule],
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
