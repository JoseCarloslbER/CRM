import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseScrollbarDirective } from '@fuse/directives/scrollbar';
import { Subject } from 'rxjs';
import { Chat } from './quick-chat.types';
import { MaterialModule } from 'app/shared/material/material.module';

@Component({
    selector     : 'quick-chat',
    templateUrl  : './quick-chat.component.html',
    styleUrls    : ['./quick-chat.component.scss'],
    encapsulation: ViewEncapsulation.None,
    exportAs     : 'quickChat',
    standalone   : true,
    imports      : [MaterialModule, NgClass, NgIf, MatIconModule, MatButtonModule, FuseScrollbarDirective, NgFor, NgTemplateOutlet, MatFormFieldModule, MatInputModule, TextFieldModule, DatePipe],
})
export class QuickChatComponent implements OnInit, OnDestroy {
    private onDestroy = new Subject<void>();

    @ViewChild('messageInput') messageInput: ElementRef;
    @ViewChild('elementoObservado') elementoObservado: ElementRef;
    private mutationObserver: MutationObserver;

    chat: Chat;
    opened: boolean = false;
    selectedChat: Chat;

    chats:any = [
        {
            id: 1,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Rogelio',
            on: true
        },
        {
            id: 2,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Daniela',
            on: false
        },
        {
            id: 3,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Raul',
            on: false
        },
        {
            id: 4,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Estefania',
            on: true
        },
        {
            id: 5,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Luisa',
            on: false
        },
        {
            id: 6,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Polo',
            on: true
        },
        {
            id: 7,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Plegio',
            on: false
        },
        {
            id: 8,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Susana',
            on: false
        },
        {
            id: 9,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Yulia',
            on: false
        },
        {
            id: 10,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Juliana',
            on: true
        },
        {
            id: 10,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Ramon',
            on: false
        },
        {
            id: 5,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Luisa',
            on: true
        },
        {
            id: 6,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Polo',
            on: false
        },
        {
            id: 7,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Plegio',
            on: true
        },
        {
            id: 8,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Susana',
            on: false
        },
        {
            id: 9,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Yulia',
            on: true
        },
        {
            id: 10,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Juliana',
            on: false
        },
        {
            id: 10,
            photo : '../../../../../assets/images/user-lateral.png',
            name : 'Ramon',
            on: true
        },
    ]

    constructor() { }

    ngOnInit(): void {
        const config: MutationObserverInit = {};

        if (this.elementoObservado) this.mutationObserver.observe(this.elementoObservado.nativeElement, config);
    }
  
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
    
    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.unsubscribe();

        if (this.mutationObserver) this.mutationObserver.disconnect();
    }
}
