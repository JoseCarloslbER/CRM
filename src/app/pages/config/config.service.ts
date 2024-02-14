import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable } from 'rxjs';
import * as entity from './config-interface';
import { Mapper } from './mapper';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private apiUrl = `${environment.apiURL}settings/`;

  constructor(
    private http: HttpClient
  ) { }

  // PRODUCT CATEGORIES
   
  public getTableDataProductCategory(): Observable<entity.TableDataProductCategory[]> {
		const url = `${this.apiUrl}product-category/`;

    return this.http.get<entity.TableDataProductCategory[]>(url);
	}

  public getDataIdProductCategory(id:string): Observable<entity.GetDataProductCategory> {
		const url = `${this.apiUrl}product-category/${id}/`;

    return this.http.get<entity.GetDataProductCategory>(url);
	}

  public postDataProductCategory(data:entity.PostDataProductCategory): Observable<any> {
		const url = `${this.apiUrl}product-category/`;

    return this.http.post<any>(url, data);
	}

  public patchDataProductCategory(id:string, data:entity.PatchDataProductCategory): Observable<any> {
		const url = `${this.apiUrl}product-category/${id}/`;

    return this.http.patch<any>(url, data);
	}
 
  public deleteDataProductCategory(id:string): Observable<any> {
		const url = `${this.apiUrl}product-category/${id}/`;

    return this.http.delete<any>(url);
	}

  // END PRODUCT CATEGORIES 


  // WAY TO PAY 
   
  public getTableDataWayToPay(): Observable<entity.TableDataWayToPay[]> {
		const url = `${this.apiUrl}payment-method/`;

    return this.http.get<entity.TableDataWayToPay[]>(url);
	}

  public getDataIdWayToPay(id:string): Observable<entity.GetDataWayToPay> {
		const url = `${this.apiUrl}payment-method/${id}/`;

    return this.http.get<entity.GetDataWayToPay>(url);
	}

  public postDataWayToPay(data:entity.PostDataWayToPay): Observable<any> {
		const url = `${this.apiUrl}payment-method/`;

    return this.http.post<any>(url, data);
	}

  public patchDataWayToPay(id:string, data:entity.PatchDataWayToPay): Observable<any> {
		const url = `${this.apiUrl}payment-method/${id}/`;

    return this.http.patch<any>(url, data);
	}
 
  public deleteDataWayToPay(id:string): Observable<any> {
		const url = `${this.apiUrl}payment-method/${id}/`;

    return this.http.delete<any>(url);
	}

  // END WAY TO PAY  




}
