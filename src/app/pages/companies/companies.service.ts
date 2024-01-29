import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable } from 'rxjs';
import { DataTable, DataTableFilters } from './companies-interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
    private http: HttpClient
  ) { }
 

  // PROSPECTS 
  public getDataTableProspects(filters:DataTableFilters): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<DataTable>(url)
	}
  
  public getDataIdProspect(id:string): Observable<any> {
		const url = `${environment.apiURL}/${id}`;

    return this.http.get<DataTable>(url)
	}

  public postDataProspect(data:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.post<any>(url, data)
	}

  public patchDataProspect(data:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteDataProspect(id:string): Observable<any> {
		const url = `${environment.apiURL}/${id}`;

    return this.http.delete<any>(url)
	}
  
  public asyncProspects(data:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.post<any>(url, data)
	}
 
  public bulkLoadProspects(data:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.post<any>(url, data)
	}

  public excelProspects(data:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.post<any>(url, data)
	}

  // END PROSPECTS 





}
