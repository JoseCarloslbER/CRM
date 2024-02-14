import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, map } from 'rxjs';
import { DataTableFilters } from './catchment-interface';
import * as entity from './catchment-interface';
import { Mapper } from './mapper';
import * as entityGeneral from '../../shared/interfaces/general-interface';

@Injectable({
  providedIn: 'root'
})
export class CatchmentService {

  private apiUrl = `${environment.apiURL}catch/`;

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

  public getCatCompany(filters:any): Observable<entityGeneral.DataCatCompany[]> {
		const url = `${environment.apiURL}company/company/${filters ? `?${filters}` : ''}`;

    return this.http.get<entityGeneral.DataCatCompany[]>(url)
	}

  // END CATALOGS 


  // CAMPAIGNS
  public getDataTableCampaing(filters?:DataTableFilters): Observable<entity.TableDataCampaingMapper[]> {
		const url = `${this.apiUrl}campaign/${filters ? `?${filters}` : ''}`;

    return this.http.get<entity.TableDataCampaing[]>(url).pipe(
			map((response) => Mapper.getDataTableCampaingMapper(response)),
		);
	}

  public getDataId(id:string): Observable<entity.GetDataCampainMapper> {
		const url = `${this.apiUrl}campaign/${id}/`;

    return this.http.get<entity.TableDataCampaing>(url).pipe(
			map((response) => Mapper.editDataTableCampaingMapper(response))
		);
	}

  public postData(data:entity.PostDataCampaing): Observable<any> {
		const url = `${this.apiUrl}campaign/`;

    return this.http.post<any>(url, data)
	}

  public patchData(id:string, data:entity.PatchDataCampaing): Observable<any> {
		const url = `${this.apiUrl}campaign/${id}/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteData(id:string): Observable<any> {
		const url = `${this.apiUrl}campaign/${id}/`;

    return this.http.delete<any>(url)
	}

  public excel(data:any): Observable<any> {
		const url = `${this.apiUrl}/`;

    return this.http.post<any>(url, data)
	}

  // END CAMPAIGNS




}
