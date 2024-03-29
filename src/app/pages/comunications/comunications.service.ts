import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { BehaviorSubject, Observable, map } from 'rxjs';
import * as entity from './comunications-interface';
import * as entityGeneral from '../../shared/interfaces/general-interface';
import { Mapper } from './mapper';
import { TableDataActivities } from '../management/management-interface';

@Injectable({
  providedIn: 'root'
})
export class ComunicationsService {
  private dataSubject = new BehaviorSubject<any>(null);

  private apiUrl = `${environment.apiURL}communication/`;

  constructor(private http: HttpClient) { }
  
  public sendData(data: any) {
    console.log(data);
    this.dataSubject.next(data);
  }
 
  public getData() {
    return this.dataSubject.asObservable();
  }


  public getDataTawkTo(filter:string): Observable<any> {
    const url = `${this.apiUrl}tawkto-chat/?chat_id=${filter}`;

    return this.http.get<any>(url)
    // .pipe(
		// 	map((response) => Mapper.GetDatadetailsActivityMapper(response))
		// );
	}

  public getDataId(id:string): Observable<any> {
		const url = `${this.apiUrl}company/${id}/`;

    return this.http.get<any>(url)
    // .pipe(
		// 	map((response) => Mapper.getDataTableCompanyMapper(response))
		// );
	}
}
