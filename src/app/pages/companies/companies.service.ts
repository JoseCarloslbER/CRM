import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, map } from 'rxjs';
import * as entity from './companies-interface';
import * as entityGeneral from '../../shared/interfaces/general-interface';
import { Mapper } from './mapper';
import { TableDataActivities } from '../management/management-interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private apiUrl = `${environment.apiURL}company/`;

  constructor(private http: HttpClient) { }

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

  public getDataHistoryCalls(filters?:string): Observable<entity.GetDataDetailsHistoryMapper[]> {
    const url = `${environment.apiURL}manage/activity/${filters ? `?${filters}` : ''}`;

    return this.http.get<TableDataActivities[]>(url).pipe(
			map((response) => Mapper.GetDatadetailsActivityMapper(response))
		);
	}

  public getDataTable(filters?:string): Observable<entity.TableDataCompanyMapper[]> {
    const url = `${this.apiUrl}company/${filters ? `?${filters}` : ''}`;
    
    return this.http.get<entity.TableDataCompany[]>(url).pipe(
			map((response) => Mapper.getDataTableMapper(response))
		);
	}
  
  public getDataId(id:string): Observable<any> {
		const url = `${this.apiUrl}company/${id}/`;

    return this.http.get<entity.TableDataCompany>(url).pipe(
			map((response) => Mapper.getDataTableCompanyMapper(response))
		);
	}
  
  public getDataDetailsCompanyId(id:string): Observable<entity.GetDataDetailsCompanyMapper> {
		const url = `${this.apiUrl}company/${id}/`;

    return this.http.get<entity.TableDataCompany>(url).pipe(
			map((response) => Mapper.GetDataDetailsCompanyMapper(response))
		);
	}

  public postDataContact(data:any): Observable<any> {
    const url = `${this.apiUrl}company/company-contact/`;
    
    return this.http.post<any>(url, data)
	}
  
  public patchDataContact(id:string, data:any): Observable<any> {
    const url = `${this.apiUrl}company/company-contact/${id}/`;

    return this.http.patch<any>(url, data)
  }
 
  public postData(data:entity.PostDataCompany): Observable<any> {
		const url = `${this.apiUrl}company/`;

    return this.http.post<any>(url, data)
	}

  public patchData(id:string, data:entity.GetDataCompanyMapper): Observable<any> {
		const url = `${this.apiUrl}company/${id}/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteData(id:string): Observable<any> {
		const url = `${this.apiUrl}company/${id}/`;

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

  public postDataQuote(data:any): Observable<any> {
		const url = `${environment.apiURL}conversion/quote/`;

    return this.http.post<any>(url, data)
	}

  

}
