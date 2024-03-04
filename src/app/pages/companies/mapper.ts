import { TableDataActivities } from '../management/management-interface';
import * as entity from './companies-interface';
import { Owner } from '../../shared/interfaces/general-interface';
import moment from 'moment';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataCompany[]) : entity.TableDataCompanyMapper[] {
		let dataList :entity.TableDataCompanyMapper[] = [];

		console.log(response);
		
		response.forEach((data: entity.TableDataCompany): void => {
			dataList.push({
				id: data?.company_id || '-',
				logo : data?.logo?.includes('default') ? `../../../assets/images/default.png` : data.logo,
				companyName: data?.company_name || '-',
				status: data?.company_phase?.phase_name || '-',
				country : data.country?.country_name || '-',
				origin: data?.platform?.platform_name || '-',
				category: data?.company_type?.type_name || '-',
				business: data?.business?.business_name || '-',
				campaing: data?.campaing?.campaign_name || '-',
				quotes: {
					amount : data.amout_quotes,
					totalAmount: '$' + parseFloat(data.total_quotes).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})
				},
				sales: {
					amount : data.amout_sales,
					totalAmount: '$' + parseFloat(data.total_sales).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})
				},
				lastContactDate : data?.last_activity?.date_contact || '-',
				history : data?.last_activity?.activity_description || '-'
			});
		});

		return dataList
	}

	static getDataTableCompanyMapper(response: entity.TableDataCompany) : entity.GetDataCompanyMapper {
		return {
			id: response?.company_id,
			company_name: response?.company_name,
			platform: response?.platform?.platform_id,
			phone_number: response?.phone_number,
			email: response?.email,
			tax_id_number: response?.tax_id_number,
			state: response?.state?.state_id,
			owner_user: response?.owner_user?.id,
			country: response?.country?.country_id,
			business: response?.business?.business_id,
			city: response?.city?.city_id,
			address: response?.address,
			company_type: response?.company_type?.company_type_id,
			company_size: response?.company_size?.company_size_id,
			web_page: response?.web_page,
			comments: response?.comments
		}
	};
	
	static GetDatadetailsCompanyMapper(response: entity.TableDataCompany) : entity.GetDataDetailsCompanyMapper {
		console.log(response);
		
		return {
			id: response?.company_id,
			logo : response?.logo?.includes('default') ? `../../../assets/images/default.png` : response.logo,
			companyName : response?.company_name || '-',
			statusCompany : response?.company_phase?.phase_name || '-',
			city : response?.city?.city_name || '-',
			country : response?.country?.country_name || '-',
			web : response?.web_page || '-',
			business : response?.business?.business_name || '-',
			category : response?.company_size?.size_name || '-',
			campaign : response?.campaing?.campaign_name || '-',
			owner:`${response?.owner_user?.first_name && response?.owner_user?.last_name ? response.owner_user?.first_name.toUpperCase() + ' ' + response.owner_user?.last_name.toUpperCase() : response.owner_user?.username.toUpperCase() || '-' }`,
			email : response?.email || '-',
			phone : response?.phone_number || '-',
		}
	};
	
	static GetDatadetailsActivityMapper(response: TableDataActivities[]) {
		// let dataList :entity.TableDataCompanyMapper[] = [];
		let dataList :any[] = [];

		console.log(response);
		
		response.forEach((data: TableDataActivities, index): void => {
			const formattedDate = moment(data.activity_date).format('YYYY-MM-DD');
			const formattedTime = moment(data.activity_hour, 'HH:mm').format('HH:mm');
			const combinedDateTime = moment(`${formattedDate}T${formattedTime}:00.000Z`).toISOString();

			console.log(combinedDateTime);
			
			dataList.push({
				id: data?.activity_id || '-',
				activity: `Actividad ${index + 1 }`,
				agent:`${data?.user?.first_name && data?.user?.last_name ? data.user?.first_name.toUpperCase() + ' ' + data.user?.last_name.toUpperCase() : data.user?.username.toUpperCase() || '-' }`,
				description: data?.description || '-',
				date: combinedDateTime,
			});
		});

		return dataList
	};
}
