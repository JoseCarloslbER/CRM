import { Injectable } from '@angular/core';
import * as entityGeneral from '../../shared/interfaces/general-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.dev';

@Injectable({
	providedIn: 'root',
})
export class CatalogsService {
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

	public getCatCompany(filters?: any): Observable<entityGeneral.DataCatCompany[]> {
		const url = `${environment.apiURL}company/company/${filters ? `?${filters}` : ''}`;

		return this.http.get<entityGeneral.DataCatCompany[]>(url)
	}

	public getCatCampaing(): Observable<entityGeneral.DataCatCampaing[]> {
		const url = `${environment.apiURL}catch/campaign-list/`;

		return this.http.get<entityGeneral.DataCatCampaing[]>(url)
	}

	public getCatDataWayToPay(): Observable<entityGeneral.DataCatWayToPay[]> {
		const url = `${environment.apiURL}settings/payment-method/`;

		return this.http.get<entityGeneral.DataCatWayToPay[]>(url);
	}

	public getCatProducts(): Observable<entityGeneral.DataCatProducts[]> {
		const url = `${environment.apiURL}admin/product/`;

		return this.http.get<entityGeneral.DataCatProducts[]>(url)
	}

	public getCatDataContact(filter): Observable<entityGeneral.DataCatContact[]> {
		const url = `${environment.apiURL}company/company-contact/${filter ? `?${filter}` : ''}`;

		return this.http.get<entityGeneral.DataCatContact[]>(url);
	}
	
	public getCatPaymentMethod(): Observable<entityGeneral.DataCatPaymentMethod[]> {
		const url = `${environment.apiURL}settings/payment-method/`;

		return this.http.get<entityGeneral.DataCatPaymentMethod[]>(url);
	}
	
	public getCatPaymentCondition(): Observable<entityGeneral.DataCatPaymentCondition[]> {
		const url = `${environment.apiURL}settings/payment-condition/`;

		return this.http.get<entityGeneral.DataCatPaymentCondition[]>(url);
	}
	
	public getCatInvoiceUse(): Observable<entityGeneral.DataCatInvoiceUse[]> {
		const url = `${environment.apiURL}settings/invoice-use/`;

		return this.http.get<entityGeneral.DataCatInvoiceUse[]>(url);
	}

}
