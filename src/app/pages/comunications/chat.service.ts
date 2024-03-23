import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ChatService
{
    private _chat: BehaviorSubject<any> = new BehaviorSubject(null);
    private _chats: BehaviorSubject<any[]> = new BehaviorSubject(null);
    private _contact: BehaviorSubject<any> = new BehaviorSubject(null);
    private _contacts: BehaviorSubject<any[]> = new BehaviorSubject(null);
    private _profile: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for chat
     */
    get chat$(): Observable<any>
    {
        return this._chat.asObservable();
    }

    /**
     * Getter for chats
     */
    get chats$(): Observable<any[]>
    {
        return this._chats.asObservable();
    }

    /**
     * Getter for contact
     */
    get contact$(): Observable<any>
    {
        return this._contact.asObservable();
    }

    /**
     * Getter for contacts
     */
    get contacts$(): Observable<any[]>
    {
        return this._contacts.asObservable();
    }

    /**
     * Getter for profile
     */
    get profile$(): Observable<any>
    {
        return this._profile.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get chats
     */
    getChats(): Observable<any>
    {
        return this._httpClient.get<any[]>('api/apps/chat/chats').pipe(
            tap((response: any[]) =>
            {
                this._chats.next(response);
            }),
        );
    }

    /**
     * Get contact
     *
     * @param id
     */
    getContact(id: string): Observable<any>
    {
        return this._httpClient.get<any>('api/apps/chat/contacts', {params: {id}}).pipe(
            tap((response: any) =>
            {
                this._contact.next(response);
            }),
        );
    }

    /**
     * Get contacts
     */
    getContacts(): Observable<any>
    {
        return this._httpClient.get<any[]>('api/apps/chat/anys').pipe(
            tap((response: any[]) =>
            {
                this._contacts.next(response);
            }),
        );
    }

    /**
     * Get profile
     */
    getProfile(): Observable<any>
    {
        return this._httpClient.get<any>('api/apps/chat/profile').pipe(
            tap((response: any) =>
            {
                this._profile.next(response);
            }),
        );
    }

    /**
     * Get chat
     *
     * @param id
     */
    getChatById(id: string): Observable<any>
    {
        return this._httpClient.get<any>('api/apps/chat/chat', {params: {id}}).pipe(
            map((chat) =>
            {
                // Update the chat
                this._chat.next(chat);

                // Return the chat
                return chat;
            }),
            switchMap((chat) =>
            {
                if ( !chat )
                {
                    return throwError('Could not found chat with id of ' + id + '!');
                }

                return of(chat);
            }),
        );
    }

    /**
     * Update chat
     *
     * @param id
     * @param chat
     */
    updateChat(id: string, chat: any): Observable<any>
    {
        return this.chats$.pipe(
            take(1),
            switchMap(chats => this._httpClient.patch<any>('api/apps/chat/chat', {
                id,
                chat,
            }).pipe(
                map((updatedChat) =>
                {
                    // Find the index of the updated chat
                    const index = chats.findIndex(item => item.id === id);

                    // Update the chat
                    chats[index] = updatedChat;

                    // Update the chats
                    this._chats.next(chats);

                    // Return the updated contact
                    return updatedChat;
                }),
                switchMap(updatedChat => this.chat$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() =>
                    {
                        // Update the chat if it's selected
                        this._chat.next(updatedChat);

                        // Return the updated chat
                        return updatedChat;
                    }),
                )),
            )),
        );
    }

    /**
     * Reset the selected chat
     */
    resetChat(): void
    {
        this._chat.next(null);
    }
}
