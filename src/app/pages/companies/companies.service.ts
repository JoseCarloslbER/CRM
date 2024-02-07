import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable } from 'rxjs';
import { DataTable, DataTableFilters } from './companies-interface';
import * as entity from './companies-interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private apiUrl = `${environment.apiURL}companies/`;

  constructor(private http: HttpClient) { }

   // CATALOGS
  
   public getCatalogCompanySize(): Observable<entity.DataCatCompanySize[]> {
		const url = `${environment.apiURL}conversion/company-size/`;

    return this.http.get<entity.DataCatCompanySize[]>(url)
	}

  public getCatalogCompanyType(): Observable<entity.DataCatCompanyType[]> {
		const url = `${environment.apiURL}conversion/company-type/`;

    return this.http.get<entity.DataCatCompanyType[]>(url)
	}

  public getCatalogCountry(): Observable<entity.DataCatCountry[]> {
		const url = `${environment.apiURL}settings/country/`;

    return this.http.get<entity.DataCatCountry[]>(url)
	}

  public getCatalogState(): Observable<entity.DataCatState[]> {
		const url = `${environment.apiURL}settings/state/`;

    return this.http.get<entity.DataCatState[]>(url)
	}

  public getCatalogCity(): Observable<entity.DataCatCity[]> {
		const url = `${environment.apiURL}settings/city/`;

    return this.http.get<entity.DataCatCity[]>(url)
	}

  public getCatalogBusiness(): Observable<entity.DataCatBusiness[]> {
		const url = `${environment.apiURL}settings/business/`;

    return this.http.get<entity.DataCatBusiness[]>(url)
	}

  // END CATALOGS 
 

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
