import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, map } from 'rxjs';
import * as entity from './config-interface';
import * as entityGeneral from '../../shared/interfaces/general-interface';
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




}
