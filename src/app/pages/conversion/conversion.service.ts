import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable } from 'rxjs';
import * as entity from './conversion-interface';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  private apiUrl = `${environment.apiURL}conversion/`;

  constructor(private http: HttpClient) { }

   // CATALOGS
  
   public getDataTable(filters?: entity.DataTableFilters): Observable<entity.DataCompanyTable[]> {
		const url = `${this.apiUrl}company/`;

    return this.http.get<entity.DataCompanyTable[]>(url)
	}

  // END CATALOGS 
}
