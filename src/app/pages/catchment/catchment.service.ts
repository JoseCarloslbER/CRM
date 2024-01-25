import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable } from 'rxjs';
import { DataTable } from './catchment-interface';

@Injectable({
  providedIn: 'root'
})
export class CatchmentService {

  constructor(
    private http: HttpClient
  ) { }


  public getDataTable(filters:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<DataTable>(url)
	}
 
  public getDataStatus(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<DataTable>(url)
	}

  public getDataGiro(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<DataTable>(url)
	}

  public getDataCampaigns(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<DataTable>(url)
	}



}
