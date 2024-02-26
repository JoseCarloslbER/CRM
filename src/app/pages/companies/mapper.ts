import * as entity from './companies-interface';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataCompany[]) : entity.TableDataCompanyMapper[] {
		let dataList :entity.TableDataCompanyMapper[] = [];

		console.log(response);
		
		response.forEach((data: entity.TableDataCompany): void => {
			dataList.push({
				id: data?.company_id || '-',
				logo : data?.logo?.includes('default') ? `../../../assets/images/default.png` : data.logo,
				conpanyName: data?.company_name || '-',
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

	static editDataTableCompanyMapper(response: entity.TableDataCompany) : entity.GetDataCompanyMapper {
		return {
			id: response?.company_id,
			company_name: response?.company_name,
			platform: response?.platform?.platform_id,
			phone_number: response?.phone_number,
			email: response?.email,
			tax_id_number: response?.tax_id_number,
			state: response?.state.state_id,
			owner_user: response?.owner_user.id,
			country: response?.country?.country_id,
			business: response?.business?.business_id,
			city: response?.city.city_id,
			address: response?.address,
			company_type: response?.company_type?.company_type_id,
			company_size: response?.company_size?.company_size_id,
			web_page: response?.web_page,
			comments: response?.comments
		}
	};
	
	
}
