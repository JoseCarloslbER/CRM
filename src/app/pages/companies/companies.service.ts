import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, map } from 'rxjs';
import * as entity from './companies-interface';
import * as entityGeneral from '../../shared/interfaces/general-interface';
import { Mapper } from './mapper';
import { TableDataActivityType } from '../config/config-interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private apiUrl = `${environment.apiURL}company/`;

  constructor(private http: HttpClient) { }

   // CATALOGS
  
   public getCatalogCompanySize(): Observable<entityGeneral.DataCatCompanySize[]> {
		const url = `${environment.apiURL}conversion/company-size/`;

    return this.http.get<entityGeneral.DataCatCompanySize[]>(url)
	}

  public getCatalogCompanyType(): Observable<entityGeneral.DataCatCompanyType[]> {
		const url = `${environment.apiURL}conversion/company-type/`;

    return this.http.get<entityGeneral.DataCatCompanyType[]>(url)
	}

  public getCatalogCountry(): Observable<entityGeneral.DataCatCountry[]> {
		const url = `${environment.apiURL}settings/country/`;

    return this.http.get<entityGeneral.DataCatCountry[]>(url)
	}

  public getCatalogState(): Observable<entityGeneral.DataCatState[]> {
		const url = `${environment.apiURL}settings/state/`;

    return this.http.get<entityGeneral.DataCatState[]>(url)
	}

  public getCatalogCity(): Observable<entityGeneral.DataCatCity[]> {
		const url = `${environment.apiURL}settings/city/`;

    return this.http.get<entityGeneral.DataCatCity[]>(url)
	}

  public getCatalogBusiness(): Observable<entityGeneral.DataCatBusiness[]> {
		const url = `${environment.apiURL}settings/business/`;

    return this.http.get<entityGeneral.DataCatBusiness[]>(url)
	}

  public getCatStatus(): Observable<entityGeneral.DataCatStatus[]> {
		const url = `${environment.apiURL}settings/status/`;

    return this.http.get<entityGeneral.DataCatStatus[]>(url)
	}

  public getCatCampaing(): Observable<entityGeneral.DataCatCampaing[]> {
		const url = `${environment.apiURL}catch/campaign-list/`;

    return this.http.get<entityGeneral.DataCatCampaing[]>(url)
	}

  public getCatActivityType(): Observable<TableDataActivityType[]> {
		const url = `${environment.apiURL}settings/activity-type/`;

    return this.http.get<TableDataActivityType[]>(url);
	}

  public getCatAgents(): Observable<entityGeneral.DataCatAgents[]> {
		const url = `${environment.apiURL}auth/user/`;

    return this.http.get<entityGeneral.DataCatAgents[]>(url)
	}

  public getCatCompany(filters?:any): Observable<entityGeneral.DataCatCompany[]> {
		const url = `${environment.apiURL}company/company/${filters ? `?${filters}` : ''}`;

    return this.http.get<entityGeneral.DataCatCompany[]>(url).pipe(
			map((response) => {
        let dataList :any = []
        response.forEach((data: entity.TableDataCompany): void => {
          dataList.push({
          companyName : data.company_name,
          companyId : data.company_id
          });
        });
        return dataList
      })
		);
	}
  

  // END CATALOGS 
 

  public getDataTable(filters?:string): Observable<entity.TableDataCompanyMapper[]> {
    const url = `${this.apiUrl}company/${filters ? `?${filters}` : ''}`;
    
    return this.http.get<entity.TableDataCompany[]>(url).pipe(
			map((response) => Mapper.getDataTableMapper(response))
		);
	}
  
  public getDataId(id:string): Observable<any> {
		const url = `${this.apiUrl}company/${id}/`;

    return this.http.get<entity.TableDataCompany>(url).pipe(
			map((response) => Mapper.editDataTableCompanyMapper(response))
		);
    
	}

  public postData(data:entity.PostDataCompany): Observable<any> {
		const url = `${this.apiUrl}company/`;

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
  
  public async(data:any): Observable<any> {
		const url = `${this.apiUrl}/`;

    return this.http.post<any>(url, data)
	}
 
  public bulkLoad(data:any): Observable<any> {
		const url = `${this.apiUrl}/`;

    return this.http.post<any>(url, data)
	}

  public excel(data:any): Observable<any> {
		const url = `${this.apiUrl}/`;

    return this.http.post<any>(url, data)
	}

}
