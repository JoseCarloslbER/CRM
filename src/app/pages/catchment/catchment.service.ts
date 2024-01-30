import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable } from 'rxjs';
import { DataTable, DataTableFilters } from './catchment-interface';

@Injectable({
  providedIn: 'root'
})
export class CatchmentService {

  constructor(
    private http: HttpClient
  ) { }


  // CAMPAIGNS
  public getDataTableCampaing(filters:DataTableFilters): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<DataTable>(url)
	}

  public getDataAgents(id:string): Observable<any> {
		const url = `${environment.apiURL}/${id}`;

    return this.http.get<DataTable>(url)
	}
  
  public getDataCompanies(id:string): Observable<any> {
		const url = `${environment.apiURL}/${id}`;

    return this.http.get<DataTable>(url)
	}

  public getDataResultsCompanies(id:string): Observable<any> {
		const url = `${environment.apiURL}/${id}`;

    return this.http.get<DataTable>(url)
	}

  public getDataId(id:string): Observable<any> {
		const url = `${environment.apiURL}/${id}`;

    return this.http.get<DataTable>(url)
	}

  public postData(data:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.post<any>(url, data)
	}

  public patchData(data:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteData(id:string): Observable<any> {
		const url = `${environment.apiURL}/${id}`;

    return this.http.delete<any>(url)
	}

  public excel(data:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.post<any>(url, data)
	}

  // END CAMPAIGNS




}
