import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, map } from 'rxjs';
import * as entity from './conversion-interface';
import { Mapper } from './mapper';
import * as entityGeneral from '../../shared/interfaces/general-interface';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  private apiUrl = `${environment.apiURL}conversion/`;

  constructor(private http: HttpClient) { }

   // CATALOGS
   public getCatStatus(): Observable<entityGeneral.DataCatStatus[]> {
		const url = `${environment.apiURL}settings/status/`;

    return this.http.get<entityGeneral.DataCatStatus[]>(url)
	}

  public getCatAgents(): Observable<entityGeneral.DataCatAgents[]> {
		const url = `${environment.apiURL}auth/user/`;

    return this.http.get<entityGeneral.DataCatAgents[]>(url)
	}

  // END CATALOGS
  
   public getDataTable(filters?:string): Observable<entity.TableDataQuoteMapper[]> {
    const url = `${this.apiUrl}quote/${filters ? `?${filters}` : ''}`;
    
    return this.http.get<entity.TableDataQuote[]>(url).pipe(
			map((response) => Mapper.getDataTableMapper(response))
		);
	}
  
  public getDataId(id:string): Observable<any> {
		const url = `${this.apiUrl}company/${id}/`;

    return this.http.get<any>(url).pipe(
			map((response) => Mapper.editDataTableCompanyMapper(response))
		);
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
  

  // END CATALOGS 
}
