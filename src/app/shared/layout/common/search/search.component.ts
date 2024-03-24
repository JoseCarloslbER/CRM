import { Overlay } from '@angular/cdk/overlay';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, HostBinding, inject, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY, MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations/public-api';
import { debounceTime, filter, map, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    encapsulation: ViewEncapsulation.None,
    exportAs: 'fuseSearch',
    animations: fuseAnimations,
    standalone: true,
    imports: [NgIf, MatButtonModule, MatIconModule, FormsModule, MatAutocompleteModule, ReactiveFormsModule, MatOptionModule, NgFor, RouterLink, NgTemplateOutlet, MatFormFieldModule, MatInputModule, NgClass],
    providers: [
        {
            provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
            useFactory: () => {
                const overlay = inject(Overlay);
                return () => overlay.scrollStrategies.block();
            },
        },
    ],
})
export class SearchComponent implements OnChanges, OnInit, OnDestroy {
    private onDestroy = new Subject<void>();

    @Input() appearance: 'basic' | 'bar' = 'basic';
    @Input() debounce: number = 300;
    @Input() minLength: number = 2;
    @Output() search: EventEmitter<any> = new EventEmitter<any>();

    opened: boolean = false;
    resultSets: any[];
    searchControl: UntypedFormControl = new UntypedFormControl();
    private _matAutocomplete: MatAutocomplete;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _httpClient: HttpClient,
    ) { }

    @HostBinding('class') get classList(): any {
        return {
            'search-appearance-bar': this.appearance === 'bar',
            'search-appearance-basic': this.appearance === 'basic',
            'search-opened': this.opened,
        };
    }

    @ViewChild('barSearchInput')
    set barSearchInput(value: ElementRef) {
        if (value) {
            setTimeout(() => {
                value.nativeElement.focus();
            });
        }
    }

    @ViewChild('matAutocomplete')
    set matAutocomplete(value: MatAutocomplete) {
        this._matAutocomplete = value;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('appearance' in changes) {
            this.close();
        }
    }

    ngOnInit(): void {
        this.searchControl.valueChanges
            .pipe(
                debounceTime(this.debounce),
                takeUntil(this._unsubscribeAll),
                map((value) => {
                    if (!value || value.length < this.minLength) {
                        this.resultSets = null;
                    }

                    return value;
                }),
                filter(value => value && value.length >= this.minLength),
            )
            .subscribe((value) => {
                this._httpClient.post('api/common/search', { query: value })
                    .subscribe((resultSets: any) => {
                        console.log('resultSets', resultSets);
                        this.resultSets = resultSets;
                        this.search.next(resultSets);
                    });
            });
    }

    onKeydown(event: KeyboardEvent): void {
        if (event.code === 'Escape') {
            if (this.appearance === 'bar' && !this._matAutocomplete.isOpen) this.close();
        }
    }

    open(): void {
        if (this.opened) {
            return;
        }

        this.opened = true;
    }

    close(): void {
        if (!this.opened) {
            return;
        }

        this.searchControl.setValue('');

        this.opened = false;
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.unsubscribe();
    }
}
