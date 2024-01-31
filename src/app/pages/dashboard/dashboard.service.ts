import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable } from 'rxjs';
import * as entidades from './dashboard-interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  // DASHBOARD 

  public getDashboardProductsMaterial(filters:entidades.DataTableFilters): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}

  public getDashboardProductsTable(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<entidades.DataProductsTable>(url)
	}

  public getDashboardArticlesTable(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<entidades.DataArticlesTable>(url)
	}
 
  public getDashboardProductsExcel(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}

  public getDashboardArticlesExcel(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}
  
  public getDashboardSells(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}

  public getDashboardQuotes(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}

  public getDashboardSellsStatistics(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}

  public getDashboardQuotesStatistics(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}

  public getDashboardCompaniesStatistics(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}

  public getDashboardClientsStatisticsTable(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<entidades.DataClientsStatisticsTable>(url)
	}

  public getDashboardCountriesStatisticsTable(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<entidades.DataCountryStatisticsTable>(url)
	}

  // END DASHBOARD


  // PIPELINE

  public getPipeline(filters:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}
  
  // END PIPELINE
  
  
  // CAMPAINGS
  
  public getCampaings(filters:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}

  public getCampaingsQuotes(filters:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}
  
  public getCampaingsSells(filters:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
	}

  public getCampaingsHistoryTable(filters:any): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<entidades.DataCampaingsHistoryTable>(url)
	}

  public getCampaingsHistoryCompanies(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<entidades.DataCampaingsHistoryTable>(url)
	}

  public getCampaingsHistoryResults(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<entidades.DataCampaingsHistoryTable>(url)
	}

  // END CAMPAINGS
  
  // GOLADS
  public getGoalsTable(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<entidades.DataGoalsTable>(url)
	}

  public getGoalsHistors(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<entidades.DataGoalsHistoryTable>(url)
	}

  public getGoalsAgents(): Observable<any> {
		const url = `${environment.apiURL}/`;

    return this.http.get<entidades.DataGoalAgentsTable>(url)
	}

  // END GOLADS

}
