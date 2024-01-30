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
 

  public getDataTable(type:string, filters:DataTableFilters): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<DataTable>(url)
	}
  
  // PROSPECTS 
  
  public getDataId(type:string, id:string): Observable<any> {
		const url = `${environment.apiURL}/${id}`;

    return this.http.get<DataTable>(url)
	}

  public postData(type:string, data:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.post<any>(url, data)
	}

  public patchData(type:string, data:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteData(type:string, id:string): Observable<any> {
		const url = `${environment.apiURL}/${id}`;

    return this.http.delete<any>(url)
	}
  
  public async(type:string, data:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.post<any>(url, data)
	}
 
  public bulkLoad(type:string, data:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.post<any>(url, data)
	}

  public excel(type:string, data:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.post<any>(url, data)
	}

}
