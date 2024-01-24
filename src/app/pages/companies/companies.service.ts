import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable } from 'rxjs';
import { DataTable } from './companies-interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(
    private http: HttpClient
  ) { }


  public getDataTable(filters:any): Observable<any> {
    console.log(filters);
    
		const url = `${environment.apiURL}/`;

    return this.http.get<DataTable>(url)
	}



}
