import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, map, tap } from 'rxjs';
import { DataTableFilters } from './catchment-interface';
import * as entity from './catchment-interface';
import { Mapper } from './mapper';

@Injectable({
  providedIn: 'root'
})
export class CatchmentService {

  private apiUrl = `${environment.apiURL}catch/`;

  constructor(
    private http: HttpClient
  ) { }



  // CATALOGS

  public getCatalogBusiness(): Observable<entity.DataCatBusiness[]> {
		const url = `${environment.apiURL}settings/business/`;

    return this.http.get<entity.DataCatBusiness[]>(url)
	}

  public getCatalogType(): Observable<entity.DataCatType[]> {
		const url = `${this.apiUrl}campaign-type/`;

    return this.http.get<entity.DataCatType[]>(url)
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
  public getDataTableCampaing(filters?:DataTableFilters): Observable<entity.TableDataCampaingListMapper[]> {
		const url = `${this.apiUrl}campaign/`;

    return this.http.get<entity.TableDataCampaingList[]>(url).pipe(
			map((respuesta) => {
				return Mapper.getDataTableCampaingMapper(respuesta);
			}),
		);
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
