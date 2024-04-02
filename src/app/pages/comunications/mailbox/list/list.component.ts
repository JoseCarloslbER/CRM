import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Mail, MailCategory } from '../mailbox.types';
import { MailboxComponent } from '../mailbox.component';
import { MailboxService } from '../mailbox.service';

@Component({
    selector     : 'mailbox-list',
    templateUrl  : './list.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [NgIf, MatButtonModule, MatIconModule, RouterLink, MatProgressBarModule, NgFor, NgClass, RouterOutlet, DatePipe],
})
export class MailboxListComponent implements OnInit, OnDestroy {
    @ViewChild('mailList') mailList: ElementRef;

    category: MailCategory;
    mails: Mail[];
    mailsLoading: boolean = false;
    pagination: any;
    selectedMail: Mail;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        public mailboxComponent: MailboxComponent,
        private _mailboxService: MailboxService,
    ) { }

    ngOnInit(): void {
        this._mailboxService.category$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((category: MailCategory) =>
            {
                this.category = category;
            });

        this._mailboxService.mails$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mails: Mail[]) =>
            {
                this.mails = mails;
            });

        this._mailboxService.mailsLoading$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mailsLoading: boolean) => {
                this.mailsLoading = mailsLoading;
                if ( this.mailList && !mailsLoading ) this.mailList.nativeElement.scrollTo(0, 0);
            });

        this._mailboxService.pagination$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((pagination) =>
            {
                this.pagination = pagination;
            });

        this._mailboxService.mail$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mail: Mail) =>
            {
                this.selectedMail = mail;
            });
    }

    onMailSelected(mail: Mail) {
        if ( mail.unread ) {
            mail.unread = false;
            this._mailboxService.updateMail(mail.id, {unread: false}).subscribe();
        }

        this._mailboxService.selectedMailChanged.next(mail);
    }

    trackByFn(index: number, item: any) {
        return item.id || index;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
