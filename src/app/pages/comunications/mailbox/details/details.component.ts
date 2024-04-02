import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DatePipe, DecimalPipe, NgClass, NgFor, NgIf, NgPlural, NgPluralCase } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuseScrollResetDirective } from '@fuse/directives/scroll-reset';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { Subject, takeUntil } from 'rxjs';
import { Mail, MailFolder, MailLabel } from '../mailbox.types';
import { MailboxService } from '../mailbox.service';
import { labelColorDefs } from '../mailbox.constants';

@Component({
    selector     : 'mailbox-details',
    templateUrl  : './details.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [NgIf, MatButtonModule, RouterLink, MatIconModule, MatMenuModule, NgFor, MatRippleModule, MatCheckboxModule, NgClass, FuseScrollResetDirective, NgPlural, NgPluralCase, MatFormFieldModule, MatInputModule, FuseFindByKeyPipe, DecimalPipe, DatePipe],
})
export class MailboxDetailsComponent implements OnInit, OnDestroy
{
    @ViewChild('infoDetailsPanelOrigin') private _infoDetailsPanelOrigin: MatButton;
    @ViewChild('infoDetailsPanel') private _infoDetailsPanel: TemplateRef<any>;

    folders: MailFolder[];
    labelColors: any;
    labels: MailLabel[];
    mail: Mail;
    replyFormActive: boolean = false;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _elementRef: ElementRef,
        private _mailboxService: MailboxService,
        private _overlay: Overlay,
        private _router: Router,
        private _viewContainerRef: ViewContainerRef,
    ) { }

 
    ngOnInit(): void {
        this.labelColors = labelColorDefs;

        this._mailboxService.folders$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((folders: MailFolder[]) =>
            {
                this.folders = folders;
            });

        this._mailboxService.labels$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((labels: MailLabel[]) =>
            {
                this.labels = labels;
            });

        this._mailboxService.mail$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((mail: Mail) =>
            {
                this.mail = mail;
            });

        this._mailboxService.selectedMailChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() =>{
                this.replyFormActive = false;
            });
    }
   
    getCurrentFolder(): any {
        return this._activatedRoute.snapshot.paramMap.get('folder');
    }

    moveToFolder(folderSlug: string): void {
        const folder = this.folders.find(item => item.slug === folderSlug);

        if ( this.mail.folder === folder.id ) {
            return;
        }

        this.mail.folder = folder.id;

        this._mailboxService.updateMail(this.mail.id, {folder: this.mail.folder}).subscribe();

        this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent});
    }

    toggleLabel(label: MailLabel): void {
        let deleted = false;

        if ( this.mail.labels.includes(label.id) ){
            deleted = true;

            this.mail.labels.splice(this.mail.labels.indexOf(label.id), 1);
        }
        else {
            this.mail.labels.push(label.id);
        }

        this._mailboxService.updateMail(this.mail.id, {labels: this.mail.labels}).subscribe();

        if ( deleted ) {
            if ( this._activatedRoute.snapshot.paramMap.get('label') && this._activatedRoute.snapshot.paramMap.get('label') === label.slug ) {
                this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent});
            }
        }
    }

    toggleImportant(): void {
        this.mail.important = !this.mail.important;

        this._mailboxService.updateMail(this.mail.id, {important: this.mail.important}).subscribe();
        if ( !this.mail.important ) {
            if ( this._activatedRoute.snapshot.paramMap.get('filter') && this._activatedRoute.snapshot.paramMap.get('filter') === 'important' ) {
                this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent});
            }
        }
    }

    toggleStar(): void {
        this.mail.starred = !this.mail.starred;

        this._mailboxService.updateMail(this.mail.id, {starred: this.mail.starred}).subscribe();

        if ( !this.mail.starred ){
            if ( this._activatedRoute.snapshot.paramMap.get('filter') && this._activatedRoute.snapshot.paramMap.get('filter') === 'starred' ) {
                this._router.navigate(['./'], {relativeTo: this._activatedRoute.parent});
            }
        }
    }

    toggleUnread(unread: boolean): void {
        this.mail.unread = unread;

        this._mailboxService.updateMail(this.mail.id, {unread: this.mail.unread}).subscribe();
    }

    reply(): void {
        this.replyFormActive = true;

        setTimeout(() => {
            this._elementRef.nativeElement.scrollTop = this._elementRef.nativeElement.scrollHeight;
        });
    }

    replyAll(): void {
        this.replyFormActive = true;

        setTimeout(() =>{
            this._elementRef.nativeElement.scrollTop = this._elementRef.nativeElement.scrollHeight;
        });
    }

   
    forward(): void{
        this.replyFormActive = true;

        setTimeout(() => {
            this._elementRef.nativeElement.scrollTop = this._elementRef.nativeElement.scrollHeight;
        });
    }

    discard(): void {
        this.replyFormActive = false;
    }

    send(): void {
        this.replyFormActive = false;
    }

    openInfoDetailsPanel(): void {
        this._overlayRef = this._overlay.create({
            backdropClass   : '',
            hasBackdrop     : true,
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                .flexibleConnectedTo(this._infoDetailsPanelOrigin._elementRef.nativeElement)
                .withFlexibleDimensions(true)
                .withViewportMargin(16)
                .withLockedPosition(true)
                .withPositions([
                    {
                        originX : 'start',
                        originY : 'bottom',
                        overlayX: 'start',
                        overlayY: 'top',
                    },
                    {
                        originX : 'start',
                        originY : 'top',
                        overlayX: 'start',
                        overlayY: 'bottom',
                    },
                    {
                        originX : 'end',
                        originY : 'bottom',
                        overlayX: 'end',
                        overlayY: 'top',
                    },
                    {
                        originX : 'end',
                        originY : 'top',
                        overlayX: 'end',
                        overlayY: 'bottom',
                    },
                ]),
        });

        const templatePortal = new TemplatePortal(this._infoDetailsPanel, this._viewContainerRef);
        this._overlayRef.attach(templatePortal);

        this._overlayRef.backdropClick().subscribe(() => {
            if ( this._overlayRef && this._overlayRef.hasAttached() ) {
                this._overlayRef.detach();
            }

            if ( templatePortal && templatePortal.isAttached ) {
                templatePortal.detach();
            }
        });
    }

    trackByFn(index: number, item: any) {
        return item.id || index;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
