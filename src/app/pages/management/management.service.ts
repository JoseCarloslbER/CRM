import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, map } from 'rxjs';
import { Mapper } from './mapper';
import * as entityGeneral from '../../shared/interfaces/general-interface';
import * as entity from './management-interface';
import { TableDataActivityType } from '../config/config-interface';

@Injectable({
  providedIn: 'root'
})
export class ManagementmentService {

  private apiUrl = `${environment.apiURL}manage/`;

  constructor(
    private http: HttpClient
  ) { }

  // CATALOGS

  public getCatBusiness(): Observable<entityGeneral.DataCatBusiness[]> {
		const url = `${environment.apiURL}settings/business/`;

    return this.http.get<entityGeneral.DataCatBusiness[]>(url)
	}

  public getCatType(): Observable<entityGeneral.DataCatType[]> {
		const url = `${environment.apiURL}settings/campaign-type/`;

    return this.http.get<entityGeneral.DataCatType[]>(url)
	}

  public getCatStatus(): Observable<entityGeneral.DataCatStatus[]> {
		const url = `${environment.apiURL}settings/status/`;

    return this.http.get<entityGeneral.DataCatStatus[]>(url)
	}

  public getCatAgents(): Observable<entityGeneral.DataCatAgents[]> {
		const url = `${environment.apiURL}auth/user/`;

    return this.http.get<entityGeneral.DataCatAgents[]>(url)
	}

  public getCatProductCategory(): Observable<entityGeneral.DataCatProductCategory[]> {
		const url = `${environment.apiURL}settings/product-category/`;

    return this.http.get<entityGeneral.DataCatProductCategory[]>(url)
	}

  public getCatCompany(filters?:any): Observable<entityGeneral.DataCatCompany[]> {
		const url = `${environment.apiURL}company/company/${filters ? `?${filters}` : ''}`;

    return this.http.get<entityGeneral.DataCatCompany[]>(url)
	}

  public getCatActivityType(): Observable<TableDataActivityType[]> {
		const url = `${environment.apiURL}settings/activity-type/`;

    return this.http.get<TableDataActivityType[]>(url);
	}

  public getCatCampaing(): Observable<entityGeneral.DataCatCampaing[]> {
		const url = `${environment.apiURL}catch/campaign-list/`;

    return this.http.get<entityGeneral.DataCatCampaing[]>(url)
	}


  // END CATALOGS 


  // ACTIVITIES
  public getDataTableActivities(filters?:string): Observable<entity.TableDataActivitiesMapper[]> {
		const url = `${this.apiUrl}activity/${filters ? `?${filters}` : ''}`;

    return this.http.get<entity.TableDataActivities[]>(url).pipe(
    	map((response) => Mapper.getDataTableMapper(response)),
    );
	}

  public getDataId(id:string): Observable<entity.GetDataActivitiesMapper> {
		const url = `${this.apiUrl}activity/${id}/`;

    return this.http.get<entity.TableDataActivities>(url).pipe(
			map((response) => Mapper.getDataMapper(response))
		);
	}

  public postData(data:entity.PostDataActivities): Observable<any> {
		const url = `${this.apiUrl}activity/`;

    return this.http.post<any>(url, data)
	}

  public patchData(id:string, data:entity.PatchDataActivities): Observable<any> {
		const url = `${this.apiUrl}activity/${id}/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteData(id:string): Observable<any> {
		const url = `${this.apiUrl}activity/${id}/`;

    return this.http.delete<any>(url)
	}

  public excel(data:any): Observable<any> {
		const url = `${this.apiUrl}/`;

    return this.http.post<any>(url, data)
	}

  // END ACTIVITIES




}
