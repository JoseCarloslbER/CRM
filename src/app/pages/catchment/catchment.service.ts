import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, map, tap } from 'rxjs';
import { DataTableFilters } from './catchment-interface';
import * as entity from './catchment-interface';

@Injectable({
  providedIn: 'root'
})
export class CatchmentService {

  private apiUrl = `${environment.apiURL}catch/`;

  constructor(
    private http: HttpClient
  ) { }



  // CATALOGS

  public getCatalogType(): Observable<entity.DataCatalogTypeList[]> {
		const url = `${this.apiUrl}campaign-type/`;

    return this.http.get<entity.DataCatalogTypeList[]>(url)
	}

  public getCatalogStatus(): Observable<any> {
		const url = `${this.apiUrl}/`;

    return this.http.get<any>(url)
	}

  public getCatalogAgents(): Observable<any> {
		const url = `${this.apiUrl}/`;

    return this.http.get<any>(url)
	}


  // END CATALOGS 

  // CAMPAIGNS
  public getDataTableCampaing(filters?:DataTableFilters): Observable<entity.DataCampaingTable> {
		const url = `${this.apiUrl}campaign/`;

    return this.http.get<entity.DataCampaingTable>(url).pipe(
      tap((resp:any)=> {
        console.log(resp);
        resp.forEach((dato:any) => {
          dato.dateStartEnd = [{start: dato.start_date, end: dato.end_date}]
        });
      })
    )
	}

  public getDataAgents(id:string): Observable<any> {
		const url = `${this.apiUrl}/${id}`;

    return this.http.get<any>(url)
	}
  
  public getDataCompanies(id:string): Observable<any> {
		const url = `${this.apiUrl}/${id}`;

    return this.http.get<any>(url)
	}

  public getDataResultsCompanies(id:string): Observable<any> {
		const url = `${this.apiUrl}/${id}`;

    return this.http.get<any>(url)
	}

  public getDataId(id:string): Observable<any> {
		const url = `${this.apiUrl}campaign-company/${id}/`;

    return this.http.get<any>(url)
	}

  public postData(data:any): Observable<any> {
		const url = `${this.apiUrl}campaign-company/`;

    return this.http.post<any>(url, data)
	}

  public patchData(data:any): Observable<any> {
		const url = `${this.apiUrl}/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteData(id:string): Observable<any> {
		const url = `${this.apiUrl}/${id}`;

    return this.http.delete<any>(url)
	}

  public excel(data:any): Observable<any> {
		const url = `${this.apiUrl}/`;

    return this.http.post<any>(url, data)
	}

  // END CAMPAIGNS




}
