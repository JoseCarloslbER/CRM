import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = `${environment.apiURL}auth/`;

  constructor(
    private http: HttpClient
  ) { }
 
  login(credentials: { username: string; password: string }): Observable<boolean> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = { headers, withCredentials: true };

    const url = `${this.apiUrl}login/`
    
    return this.http.post<any>(url, credentials, options).pipe(
      map((response) => {
        console.log(response);

        if (response && response.token) {
          localStorage.setItem('token', response.token);
          return true;
        
        } else {
          return false;
        }
      
      }),
      catchError((error) => {
        console.error('Error during login', error);
        return of(false);
      })
    );
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('token');
    return of(true);
  }

  isAuthenticated(): boolean {
    return true
    // return !!localStorage.getItem('token');
  }

  refreshToken(): Observable<boolean> {
    return of(true);
  }
}
