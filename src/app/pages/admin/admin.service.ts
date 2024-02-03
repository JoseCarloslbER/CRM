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

  public getDataProductId(id:string): Observable<entity.GetDataProduct> {
		const url = `${environment.apiURL}product/${id}/`;

    return this.http.get<entity.GetDataProduct>(url)
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


  // PRICE

  public getDataTablePrices(): Observable<entity.DataPriceTable> {
		const url = `${environment.apiURL}price`;

    return this.http.get<entity.DataPriceTable>(url)
	}

  public getDataPriceId(id:string): Observable<entity.GetDataPrice> {
		const url = `${environment.apiURL}price${id}/`;

    return this.http.get<entity.GetDataPrice>(url)
	}

  public postDataPrice(data:entity.PostDataPrice): Observable<any> {
		const url = `${environment.apiURL}price`;

    return this.http.post<any>(url, data)
	}

  public patchDataPrice(id:string, data:entity.PostDataPrice): Observable<any> {
		const url = `${environment.apiURL}price${id}/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteDataPrice(id:string): Observable<any> {
		const url = `${environment.apiURL}price${id}/`;

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
