import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable } from 'rxjs';
import * as entity from './admin-interface';
import { DataCatCountry, DataCatProductCategory } from 'app/shared/interfaces/general-interface';
import * as entityGeneral from '../../shared/interfaces/general-interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `${environment.apiURL}admin/`;

  constructor(
    private http: HttpClient
  ) { }

  // CATALOGS
  
  public getCatCountry(): Observable<DataCatCountry[]> {
		const url = `${environment.apiURL}settings/country/`;

    return this.http.get<DataCatCountry[]>(url)
	}

  public getCatProductCategory(): Observable<DataCatProductCategory[]> {
		const url = `${environment.apiURL}settings/product-category/`;
    return this.http.get<DataCatProductCategory[]>(url)
	}

  public getCatCurrency(): Observable<entityGeneral.DataCatCurrency[]> {
		const url = `${environment.apiURL}settings/currency/`;
    return this.http.get<entityGeneral.DataCatCurrency[]>(url)
	}

  // END CATALOGS 

  // PRODUCTS 
  
  public getDataTableProducts(): Observable<entity.DataProductTable[]> {
		const url = `${this.apiUrl}product/`;

    return this.http.get<entity.DataProductTable[]>(url)
	}

  public postDataProduct(data:entity.PostDataProduct): Observable<any> {
    const url = `${this.apiUrl}product/`;

    return this.http.post<any>(url, data)
	}

  public patchDataProduct(id:string, data:entity.PostDataProduct): Observable<any> {
		const url = `${this.apiUrl}product/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteDataProduct(id:string): Observable<any> {
		const url = `${this.apiUrl}product/${id}/`;

    return this.http.delete<any>(url)
	}
 
  // END PRODUCTS 


  // PRICE

  public getDataTablePrices(): Observable<entity.DataPriceTable[]> {
		const url = `${this.apiUrl}price/`;

    return this.http.get<entity.DataPriceTable[]>(url)
	}

  public postDataPrice(data:entity.PostDataPrice): Observable<any> {
		const url = `${this.apiUrl}price/`;

    return this.http.post<any>(url, data)
	}

  public patchDataPrice(id:string, data:entity.PostDataPrice): Observable<any> {
		const url = `${this.apiUrl}price/${id}/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteDataPrice(id:string): Observable<any> {
		const url = `${this.apiUrl}price${id}/`;

    return this.http.delete<any>(url)
	}

  // END PRICE 
  
  // DISCOUNTS

  public getDataTableDiscounts(): Observable<entity.DataDiscountTable> {
		const url = `${environment.apiURL}discount`;

    return this.http.get<entity.DataDiscountTable>(url)
	}

  public getDataDiscountId(id:string): Observable<entity.GetDataDiscount> {
		const url = `${environment.apiURL}discount${id}/`;

    return this.http.get<entity.GetDataDiscount>(url)
	}

  public postDataDiscount(data:entity.PostDataDiscount): Observable<any> {
		const url = `${environment.apiURL}discount`;

    return this.http.post<any>(url, data)
	}

  public patchDataDiscount(id:string, data:entity.PostDataDiscount): Observable<any> {
		const url = `${environment.apiURL}discount${id}/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteDataDiscount(id:string): Observable<any> {
		const url = `${environment.apiURL}discount${id}/`;

    return this.http.delete<any>(url)
	}

  // END PRICE 


}
