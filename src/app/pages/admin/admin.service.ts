import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable } from 'rxjs';
import * as entity from './admin-interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `${environment.apiURL}admin/`;

  constructor(
    private http: HttpClient
  ) { }


  // PRODUCTS 
  
  public getDataTableProducts(): Observable<entity.DataProductTable> {
		const url = `${environment.apiURL}product/`;

    return this.http.get<entity.DataProductTable>(url)
	}

  public getDataProductId(id:string): Observable<any> {
		const url = `${environment.apiURL}product/${id}/`;

    return this.http.get<any>(url)
	}

  public postDataProduct(data:entity.PostDataProduct): Observable<any> {
		const url = `${environment.apiURL}product/`;

    return this.http.post<any>(url, data)
	}

  public patchDataProduct(id:string, data:entity.PostDataProduct): Observable<any> {
		const url = `${environment.apiURL}product/${id}/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteDataProduct(id:string): Observable<any> {
		const url = `${environment.apiURL}product/${id}/`;

    return this.http.delete<any>(url)
	}
 
  // END PRODUCTS 

  public getDataTable(filters:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}
 
  public getDataStatus(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}

  public getDataGiro(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}

  public getDataCampaigns(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}



}
